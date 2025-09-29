import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-gradient-card shadow-card">
        <CardContent className="pt-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          
          <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Page Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          
          <Button asChild variant="admin" className="w-full">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </a>
          </Button>
          
          <p className="mt-4 text-xs text-muted-foreground">
            Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ bộ phận hỗ trợ.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;