import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@/prisma/generated/prisma/client";
import { Filter, ArrowUpDown } from "lucide-react";

type ResultList = {
  id: number;
  title: string;
  student: {
    name: string;
    surname: string;
  };
  exam: {
    title: string;
    startTime: Date;
    lesson: {
      class: {
        name: string;
      };
      teacher: {
        name: string;
        surname: string;
      };
    };
  } | null;
  assignment: {
    title: string;
    startDate: Date;
    lesson: {
      class: {
        name: string;
      };
      teacher: {
        name: string;
        surname: string;
      };
    };
  } | null;
  score: number;
};

const ResultListPage = async (props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const role = "admin";

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Faculty",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Department",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-zinc-800 text-sm hover:bg-zinc-800/50 transition-colors"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-white">
            {item.exam?.title || item.assignment?.title}
          </h3>
        </div>
      </td>
      <td className="text-zinc-400">
        {item.student.name + " " + item.student.surname}
      </td>
      <td className="hidden md:table-cell text-zinc-400">{item.score}</td>
      <td className="hidden md:table-cell text-zinc-400">
        {item.exam?.lesson.teacher.name +
          " " +
          item.exam?.lesson.teacher.surname ||
          item.assignment?.lesson.teacher.name +
            " " +
            item.assignment?.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell text-zinc-400">
        {item.exam?.lesson.class.name || item.assignment?.lesson.class.name}
      </td>
      <td className="hidden md:table-cell text-zinc-400">
        {new Intl.DateTimeFormat("en-US").format(
          item.exam?.startTime || item.assignment?.startDate
        )}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="result" type="update" data={item} />
              <FormContainer table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await Promise.all([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  return (
    <div className="bg-zinc-900 p-4 rounded-xl flex-1 m-4 mt-0 border border-zinc-800">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-white">
          All Results
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
              <Filter className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
              <ArrowUpDown className="w-4 h-4 text-zinc-400" />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ResultListPage;
