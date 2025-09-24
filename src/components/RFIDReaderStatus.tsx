import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useState } from "react";

export function RFIDReaderStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // In a real app, this would trigger RFID scan results
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          RFID Reader Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-success" />
            ) : (
              <WifiOff className="h-5 w-5 text-destructive" />
            )}
            <span className="text-sm font-medium">Reader Connection</span>
          </div>
          <Badge className={isConnected ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Scan</span>
          <span className="text-sm font-medium">2 minutes ago</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Scans Today</span>
          <span className="text-sm font-medium">47</span>
        </div>

        <div className="pt-4 space-y-2">
          <Button 
            onClick={handleScanSimulation}
            disabled={!isConnected || isScanning}
            className="w-full"
            variant="outline"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Radio className="h-4 w-4 mr-2" />
                Simulate RFID Scan
              </>
            )}
          </Button>
          
          <Button 
            onClick={() => setIsConnected(!isConnected)}
            variant="secondary"
            className="w-full"
          >
            {isConnected ? "Disconnect" : "Reconnect"} Reader
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}