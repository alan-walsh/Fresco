'use client';

import { type ColumnDef } from '@tanstack/react-table';
import type { inferRouterOutputs } from '@trpc/server';
import { ActionsDropdown } from '~/components/DataTable/ActionsDropdown';
import { Checkbox } from '~/components/ui/checkbox';
import { DataTableColumnHeader } from '~/components/DataTable/ColumnHeader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { Settings } from 'lucide-react';
import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/Button';
import Link from 'next/link';
import { Progress } from '~/components/ui/progress';
import type { AppRouter } from '~/server/router';
import type { Stage } from '@codaco/shared-consts';

type RouterOutput = inferRouterOutputs<AppRouter>;
type Interviews = RouterOutput['interview']['get']['all'][0];

export const InterviewColumns = (
  handleDelete: (id: string) => Promise<void>,
): ColumnDef<Interviews>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Interview ID" />;
    },
  },
  // {
  //   accessorKey: 'startTime',
  //   header: 'Start Time',
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.startTime);
  //     return date.toLocaleString();
  //   },
  // },
  // {
  //   accessorKey: 'finishTime',
  //   header: 'Finish Time',
  //   cell: ({ row }) => {
  //     // finishTime is optional
  //     if (!row.original.finishTime) {
  //       return 'Not completed';
  //     }
  //     const date = new Date(row.original.finishTime);
  //     return date.toLocaleString();
  //   },
  // },
  // {
  //   accessorKey: 'exportTime',
  //   header: 'Export Time',
  //   cell: ({ row }) => {
  //     // exportTime is optional
  //     if (!row.original.exportTime) {
  //       return 'Not yet exported';
  //     }
  //     const date = new Date(row.original.exportTime);
  //     return date.toLocaleString();
  //   },
  // },
  {
    accessorKey: 'lastUpdated',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Updated" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.original.lastUpdated);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: 'participant.identifier',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Participant Identifier" />
      );
    },
  },
  {
    accessorKey: 'protocol.name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Protocol Name" />;
    },
  },
  {
    id: 'step',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Progress" />;
    },
    cell: ({ row }) => {
      const stages = row.original.protocol.stages! as unknown as Stage[];
      const progress = (row.original.currentStep / stages.length) * 100;
      return <Progress value={progress} />;
    },
  },
  {
    id: 'resume',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button variant="ghost" size="sm" className="h-8">
          <span>Resume</span>
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/interview/${row.original.id}`}>
          <Button variant="secondary" className="h-8">
            <span>Resume</span>
          </Button>
        </Link>
      );
    },
  },
  {
    id: 'actions',
    header: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Settings />
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete an individual interview.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    cell: ({ row }) => {
      return (
        <ActionsDropdown
          menuItems={[
            {
              label: 'Delete',
              row,
              component: (
                <DropdownMenuItem
                  onClick={() => void handleDelete(row.original.id)}
                >
                  Edit
                </DropdownMenuItem>
              ),
            },
          ]}
        />
      );
    },
  },
];
