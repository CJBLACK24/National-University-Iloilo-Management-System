import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Grade, Prisma } from "@/prisma/generated/prisma/client";
import { Filter, ArrowUpDown } from "lucide-react";

type GradeList = Grade & {
  _count: {
    students: number;
    classess: number;
  };
};

const GradeListPage = async (props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const role = "admin";

  const columns = [
    {
      header: "Grade Level",
      accessor: "level",
    },
    {
      header: "Students",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: GradeList) => (
    <tr
      key={item.id}
      className="border-b border-zinc-800 text-sm hover:bg-zinc-800/50 transition-colors"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-white">Grade {item.level}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell text-zinc-400">
        {item._count.students} students
      </td>
      <td className="hidden md:table-cell text-zinc-400">
        {item._count.classess} classes
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="grade" type="update" data={item} />
              <FormContainer table="grade" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.GradeWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.level = parseInt(value) || undefined;
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await Promise.all([
    prisma.grade.findMany({
      where: query,
      include: {
        _count: {
          select: {
            students: true,
            classess: true,
          },
        },
      },
      orderBy: { level: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.grade.count({ where: query }),
  ]);

  return (
    <div className="bg-zinc-900 p-4 rounded-xl flex-1 m-4 mt-0 border border-zinc-800">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-white">
          All Grades
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
            {role === "admin" && <FormContainer table="grade" type="create" />}
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

export default GradeListPage;
