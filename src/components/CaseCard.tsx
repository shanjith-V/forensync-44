import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, User, Calendar, MapPin } from "lucide-react";

interface CaseCardProps {
  caseData: {
    id: string;
    title: string;
    investigator: string;
    status: string;
    dateCreated: string;
    location: string;
    evidenceCount: number;
  };
  onClick?: () => void;
}

export function CaseCard({ caseData, onClick }: CaseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Under Review": return "bg-warning text-warning-foreground";
      case "Closed": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            {caseData.id}
          </CardTitle>
          <Badge className={getStatusColor(caseData.status)}>
            {caseData.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{caseData.title}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{caseData.investigator}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{new Date(caseData.dateCreated).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{caseData.location}</span>
        </div>
        
        <div className="pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {caseData.evidenceCount} Evidence Items
          </span>
        </div>
      </CardContent>
    </Card>
  );
}