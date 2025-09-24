import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Radio } from "lucide-react";

interface Evidence {
  id: string;
  rfidId: string;
  description: string;
  status: string;
  location: string;
  handledBy: string;
  dateCollected: string;
}

interface EvidenceTableProps {
  evidence: Evidence[];
}

export function EvidenceTable({ evidence }: EvidenceTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Analysis": return "bg-warning text-warning-foreground";
      case "Analyzed": return "bg-success text-success-foreground";
      case "Stored": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Evidence Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evidence ID</TableHead>
              <TableHead>RFID ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Handled By</TableHead>
              <TableHead>Date Collected</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evidence.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm">{item.rfidId}</span>
                  </div>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.handledBy}</TableCell>
                <TableCell>{new Date(item.dateCollected).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}