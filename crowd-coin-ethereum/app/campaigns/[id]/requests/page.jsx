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
import campaign from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import { convertBigInt } from '@/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './styles.module.css';
import { cn } from '@/lib/utils';

const CampaignRequests = () => {
  const params = useParams();

  const [requestsDetail, setRequestsDetail] = useState(null);

  const [approversCount, setApproversCount] = useState(null);

  const [isManager, setIsManager] = useState(false);

  async function getCampaignRequestsCount() {
    try {
      const campaignInstance = campaign(params.id);

      const manager = await campaignInstance.methods.manager().call();

      const accounts = await web3.eth.getAccounts();

      const currentAccount = accounts[0];

      const approversCount = await campaignInstance.methods
        .approversCount()
        .call();

      setApproversCount(convertBigInt(approversCount));

      setIsManager(manager === currentAccount);

      const requestsCount = await campaignInstance.methods
        .getRequestsCount()
        .call();

      const requestsDetail = await Promise.all(
        Array.from(Array(parseInt(convertBigInt(requestsCount))).keys()).map(
          (element, index) => {
            return campaignInstance.methods.requests(index).call();
          },
        ),
      );

      setRequestsDetail(requestsDetail);
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong, please try later.');
    }
  }

  async function onApprove(index) {
    try {
      const campaignInstance = campaign(params.id);

      const accounts = await web3.eth.getAccounts();

      await campaignInstance.methods.approveRequest(index).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong, please try later.');
    }
  }

  async function onFinalize(index) {
    try {
      const campaignInstance = campaign(params.id);

      const accounts = await web3.eth.getAccounts();

      await campaignInstance.methods.finalizeRequest(index).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong, please try later.');
    }
  }

  useEffect(() => {
    getCampaignRequestsCount();
  }, []);

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

        {requestsDetail && (
          <Table>
            <TableCaption>A list of campaign's request.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">ID</TableHead>

                <TableHead>Description</TableHead>

                <TableHead>Amount</TableHead>

                <TableHead>Recipient</TableHead>

                <TableHead>Approval count</TableHead>

                <TableHead className="text-center">Approvals</TableHead>

                {isManager && (
                  <TableHead className="text-center">Finalize</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {requestsDetail.map((request, index) => (
                <TableRow
                  key={
                    convertBigInt(request.approvalCount) +
                    request.complete +
                    request.description +
                    request.recipient +
                    convertBigInt(request.value)
                  }
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>

                  <TableCell className="capitalize">
                    {request.description}
                  </TableCell>

                  <TableCell className="text-center">
                    {web3.utils.fromWei(request.value, 'ether')}
                  </TableCell>

                  <TableCell className="truncate">
                    {request.recipient}
                  </TableCell>

                  <TableCell className="text-center">
                    {convertBigInt(request.approvalCount)}/{approversCount}
                  </TableCell>

                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className={styles.btn_approve}
                      onClick={() => onApprove(index)}
                      disabled={request.complete}
                    >
                      Approve
                    </Button>
                  </TableCell>

                  {isManager && (
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        className={styles.btn_finalize}
                        onClick={() => onFinalize(index)}
                        disabled={request.complete}
                      >
                        Finalize
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CampaignRequests;
