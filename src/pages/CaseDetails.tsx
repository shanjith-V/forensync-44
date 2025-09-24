import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EvidenceTable } from "@/components/EvidenceTable";
import { ChainOfCustodyTimeline } from "@/components/ChainOfCustodyTimeline";
import { ArrowLeft, User, Calendar, MapPin, FileText, Edit } from "lucide-react";
import { mockCases, mockEvidence } from "@/data/mockData";

export default function CaseDetails() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  
  const caseData = mockCases.find(c => c.id === caseId);
  const caseEvidence = mockEvidence.filter(e => e.caseId === caseId);
  
  if (!caseData) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Case not found.</p>
          <Button onClick={() => navigate("/cases")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cases
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Under Review": return "bg-warning text-warning-foreground";
      case "Closed": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/cases")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cases
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{caseData.id}</h1>
            <p className="text-muted-foreground">{caseData.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(caseData.status)}>
            {caseData.status}
          </Badge>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Case
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Case Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Lead Investigator</p>
                  <p className="font-medium">{caseData.investigator}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date Created</p>
                  <p className="font-medium">{new Date(caseData.dateCreated).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{caseData.location}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm mt-1">{caseData.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evidence and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <EvidenceTable evidence={caseEvidence} />
          
          {caseEvidence.length > 0 && (
            <ChainOfCustodyTimeline 
              chain={caseEvidence[0].chain} 
              evidenceId={caseEvidence[0].id}
            />
          )}
        </div>
      </div>
    </div>
  );
}