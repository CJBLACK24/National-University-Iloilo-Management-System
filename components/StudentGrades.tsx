"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data structure matching the curriculum image
const gradesData = [
  {
    year: "First Year",
    semester: "1st Semester",
    subjects: [
      {
        code: "Eng Plus",
        title: "Grammar and Development Reading",
        grade: "1.75",
      },
      {
        code: "ITE Math 1",
        title: "Mathematics in the Modern World",
        grade: "1.50",
      },
      { code: "ITCC 111", title: "Introduction to Computing", grade: "1.25" },
      { code: "ITCC 112", title: "Computer Programming 1", grade: "2.00" },
      { code: "ITGE 1", title: "Living in the IT Era", grade: "1.75" },
      {
        code: "NSTP 1",
        title: "Civic Welfare Training Service 1",
        grade: "1.25",
      },
      {
        code: "PATHFIT 1",
        title: "Physical Activities Toward Health and Fitness 1",
        grade: "1.00",
      },
    ],
  },
  {
    year: "First Year",
    semester: "2nd Semester",
    subjects: [
      { code: "ITE Math 2", title: "Discrete Mathematics", grade: "1.75" },
      { code: "ITCC 121", title: "Computer Programming 2", grade: "2.25" },
      { code: "ITCC 122", title: "Information Management", grade: "1.50" },
      {
        code: "NSTP 2",
        title: "Civic Welfare Training Service 2",
        grade: "1.50",
      },
      {
        code: "PATHFIT 2",
        title: "Physical Activities Toward Health and Fitness 2",
        grade: "1.25",
      },
    ],
  },
  {
    year: "Second Year",
    semester: "1st Semester",
    subjects: [
      {
        code: "ITCC 211",
        title: "Data Structures and Algorithms",
        grade: "2.00",
      },
      {
        code: "ITCC 212",
        title: "Applications Development and Emerging Technologies",
        grade: "1.75",
      },
      {
        code: "ITPC 1",
        title: "Fundamentals of Database Systems",
        grade: "1.50",
      },
    ],
  },
];

const StudentGrades = () => {
  return (
    <div className="flex flex-col gap-6">
      {gradesData.map((term, index) => (
        <Card key={index} className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="text-md font-semibold text-zinc-200">
              {term.year} - {term.semester}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableHead className="text-zinc-400">Subject Code</TableHead>
                  <TableHead className="text-zinc-400">
                    Descriptive Title
                  </TableHead>
                  <TableHead className="text-zinc-400 text-right">
                    Grade
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {term.subjects.map((subject, idx) => (
                  <TableRow
                    key={idx}
                    className="border-zinc-800 hover:bg-zinc-800/50 text-sm"
                  >
                    <TableCell className="font-medium text-zinc-300">
                      {subject.code}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {subject.title}
                    </TableCell>
                    <TableCell className="text-right text-zinc-300">
                      {subject.grade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentGrades;
