import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Radio, Upload, Trash2 } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface EvidenceItem {
  id: string;
  rfidId: string;
  description: string;
  location: string;
}

export default function AddCase() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseTitle, setCaseTitle] = useState("");
  const [investigator, setInvestigator] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [currentEvidence, setCurrentEvidence] = useState({
    description: "",
    location: "",
    rfidId: ""
  });

  const generateRFIDId = () => {
    const randomId = "RFID-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setCurrentEvidence(prev => ({ ...prev, rfidId: randomId }));
    
    toast({
      title: "RFID Scanned",
      description: `Generated RFID ID: ${randomId}`,
    });
  };

  const addEvidence = () => {
    if (!currentEvidence.description || !currentEvidence.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all evidence fields",
        variant: "destructive",
      });
      return;
    }

    const newEvidence: EvidenceItem = {
      id: `EV-${String(evidenceList.length + 1).padStart(3, '0')}`,
      ...currentEvidence
    };

    setEvidenceList([...evidenceList, newEvidence]);
    setCurrentEvidence({ description: "", location: "", rfidId: "" });
    
    toast({
      title: "Evidence Added",
      description: "Evidence item has been added to the case",
    });
  };

  const removeEvidence = (id: string) => {
    setEvidenceList(evidenceList.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseTitle || !investigator || !location || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate case creation
    toast({
      title: "Case Created Successfully",
      description: `Case ${caseTitle} has been created with ${evidenceList.length} evidence items`,
    });
    
    setTimeout(() => {
      navigate("/cases");
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/cases")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cases
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Case</h1>
          <p className="text-muted-foreground">Create a new forensic investigation case</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Case Information */}
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Case Title *</Label>
                <Input
                  id="title"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  placeholder="Enter case title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investigator">Lead Investigator *</Label>
                <Select value={investigator} onValueChange={setInvestigator} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investigator" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.filter(user => user.role.includes("Investigator")).map(user => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Incident Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter incident location"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Case Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed case description"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Evidence Collection */}
          <Card>
            <CardHeader>
              <CardTitle>Add Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rfid">RFID ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="rfid"
                    value={currentEvidence.rfidId}
                    onChange={(e) => setCurrentEvidence(prev => ({ ...prev, rfidId: e.target.value }))}
                    placeholder="Scan or enter RFID ID"
                    className="font-mono"
                  />
                  <Button type="button" onClick={generateRFIDId} variant="outline">
                    <Radio className="h-4 w-4 mr-2" />
                    Scan RFID
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidenceDesc">Evidence Description</Label>
                <Input
                  id="evidenceDesc"
                  value={currentEvidence.description}
                  onChange={(e) => setCurrentEvidence(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the evidence item"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidenceLocation">Storage Location</Label>
                <Input
                  id="evidenceLocation"
                  value={currentEvidence.location}
                  onChange={(e) => setCurrentEvidence(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter storage location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Evidence Photo</Label>
                <div className="flex items-center gap-2">
                  <Input id="photo" type="file" accept="image/*" />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button type="button" onClick={addEvidence} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Evidence Item
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Preview */}
        {evidenceList.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Evidence Items ({evidenceList.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evidence ID</TableHead>
                    <TableHead>RFID ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidenceList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell className="font-mono text-sm">{item.rfidId}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEvidence(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/cases")}>
            Cancel
          </Button>
          <Button type="submit">
            Create Case
          </Button>
        </div>
      </form>
    </div>
  );
}