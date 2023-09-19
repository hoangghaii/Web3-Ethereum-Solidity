'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './styles.module.css';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

const CampaignRequests = () => {
  const params = useParams();

  return (
    <div className={styles.wrapper}>
      <Heading title="Request List" />

      <div className={styles.content}>
        <Button className={styles.btn}>
          <Link
            href={`/campaigns/${params.id}/requests/new`}
            as={`/campaigns/${params.id}/requests/new`}
          >
            Add Request!
          </Link>
        </Button>

        <Table>
          <TableCaption>A list of campaign's request.</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>

              <TableHead>Description</TableHead>

              <TableHead>Amount</TableHead>

              <TableHead>Recipient</TableHead>

              <TableHead>Approval count</TableHead>

              <TableHead>Approvals</TableHead>

              <TableHead>Finalize</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>

                <TableCell>{invoice.paymentStatus}</TableCell>

                <TableCell>{invoice.paymentMethod}</TableCell>

                <TableCell>{invoice.paymentMethod}</TableCell>

                <TableCell>{invoice.paymentMethod}</TableCell>

                <TableCell>{invoice.paymentMethod}</TableCell>

                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignRequests;
