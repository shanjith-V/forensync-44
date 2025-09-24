import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, MapPin, CheckCircle } from "lucide-react";

interface ChainEvent {
  date: string;
  action: string;
  user: string;
  location: string;
}

interface ChainOfCustodyTimelineProps {
  chain: ChainEvent[];
  evidenceId: string;
}

export function ChainOfCustodyTimeline({ chain, evidenceId }: ChainOfCustodyTimelineProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "Collected": return "bg-primary text-primary-foreground";
      case "Logged": return "bg-secondary text-secondary-foreground";
      case "Analysis Started": return "bg-warning text-warning-foreground";
      case "Analysis Complete": return "bg-success text-success-foreground";
      case "Processed": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Chain of Custody - {evidenceId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {chain.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < chain.length - 1 && (
                <div className="absolute left-4 top-8 w-px h-8 bg-border"></div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getActionColor(event.action)}>
                      {event.action}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{event.user}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}