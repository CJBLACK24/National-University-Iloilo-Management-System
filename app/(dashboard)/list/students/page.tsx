import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@/prisma/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  Filter,
  ArrowUpDown,
  Eye,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";

type StudentList = Student & { class: Class };

const StudentListPage = async (props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const role = "admin"; // Mock role, normally from auth

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "University ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Department",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-zinc-800 text-sm hover:bg-zinc-800/50 transition-colors"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-white">
            {item.name} {item.surname}
          </h3>
          <p className="text-xs text-zinc-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell text-zinc-400">{item.username}</td>
      <td className="hidden md:table-cell text-zinc-400">{item.class.name}</td>
      <td className="hidden md:table-cell text-zinc-400">{item.phone}</td>
      <td className="hidden md:table-cell text-zinc-400">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 transition-colors">
              <Eye className="w-4 h-4 text-white" />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count, totalEvents] = await Promise.all([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.count({ where: query }),
    prisma.event.count(),
  ]);

  // Mock stats since schema might not have specific status fields
  const stats = [
    { title: "Total Students", value: count, icon: Users, color: "text-white" },
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "text-white",
    },
    {
      title: "Pending Approval",
      value: 0,
      icon: Clock,
      color: "text-yellow-500",
    }, // Mock data
    {
      title: "Approved Events",
      value: totalEvents,
      icon: CheckCircle2,
      color: "text-green-500",
    }, // Mock data
  ];

  return (
    <div className="p-4 flex flex-col gap-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-start justify-between shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <span className="text-zinc-400 text-sm font-medium">
                {stat.title}
              </span>
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
            </div>
            <div className="p-2 bg-zinc-800 rounded-lg">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
        {/* TOP */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">All Students</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                <Filter className="w-4 h-4 text-zinc-400" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                <ArrowUpDown className="w-4 h-4 text-zinc-400" />
              </button>
              {role === "admin" && (
                <FormContainer table="student" type="create" />
              )}
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="px-5 pb-5">
          <Table columns={columns} renderRow={renderRow} data={data} />
        </div>

        {/* PAGINATION */}
        <div className="px-5 pb-5 border-t border-zinc-800 pt-4">
          <Pagination page={p} count={count} />
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
