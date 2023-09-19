import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from './styles.module.css';
import Link from 'next/link';

const CampaignSummary = ({ detail }) => {
  return (
    <div className={styles.section}>
      <div className={styles.card_container}>
        <Card>
          <CardHeader>
            <CardTitle className="truncate">{detail.manager}</CardTitle>

            <CardDescription>Address of Manager</CardDescription>
          </CardHeader>

          <CardContent>
            <span className={styles.card_content}>
              The manager create this campaign and can create requests to
              withdraw money.
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="truncate">
              {detail.minimumContribution}
            </CardTitle>

            <CardDescription>Minimum Contribution (wei)</CardDescription>
          </CardHeader>

          <CardContent>
            <span className={styles.card_content}>
              You must contribute at least this much wei to become an approver.
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="truncate">{detail.requestsCount}</CardTitle>

            <CardDescription>Number of Requests</CardDescription>
          </CardHeader>

          <CardContent>
            <span className={styles.card_content}>
              A request trieds to withdraw money from the contact. Requests must
              be approved by approvers.
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="truncate">{detail.approversCount}</CardTitle>

            <CardDescription>Number of Approvers</CardDescription>
          </CardHeader>

          <CardContent>
            <span className={styles.card_content}>
              Number of people who have already donated to this campaign.
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="truncate">{detail.balance}</CardTitle>

            <CardDescription>Campaign Balance (ether)</CardDescription>
          </CardHeader>

          <CardContent>
            <span className={styles.card_content}>
              The balance is how much money this campaign has left to spend.
            </span>
          </CardContent>
        </Card>
      </div>

      <Button>
        <Link
          href={`/campaigns/${detail.address}/requests`}
          as={`/campaigns/${detail.address}/requests`}
        >
          View Requests
        </Link>
      </Button>
    </div>
  );
};

export default CampaignSummary;
