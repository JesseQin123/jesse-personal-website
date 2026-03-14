import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle } from "lucide-react";
import { verifyPassword } from "@/data/teaching/students";

interface PasswordGateProps {
  studentName: string;
  passwordHash: string;
  storageKey: string;
  onAuthenticated: () => void;
}

const PasswordGate = ({ studentName, passwordHash, storageKey, onAuthenticated }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const isValid = await verifyPassword(password, passwordHash);

    if (isValid) {
      sessionStorage.setItem(storageKey, "authenticated");
      onAuthenticated();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Course Portal</CardTitle>
          <CardDescription>
            Welcome, <span className="font-medium text-brand">{studentName}</span>! Please enter your course password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? "Verifying..." : "Enter Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGate;
