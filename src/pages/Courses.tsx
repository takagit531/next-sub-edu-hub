import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle, LogOut, CheckCircle, Clock, Sparkles } from "lucide-react";
import { User } from "@supabase/supabase-js";
import patternBg from "@/assets/pattern-bg.jpg";

const Courses = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Sample course data
  const courses = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `第${i + 1}講：講義タイトル ${i + 1}`,
    duration: "15分",
    completed: i < 5, // First 5 are completed
    description: "この講義では重要なトピックについて学習します",
  }));

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${patternBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-subtle" />

      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border relative z-10 animate-slide-in-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              オンライン講座
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="hover:scale-105 transition-transform">
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary animate-bounce" />
            <h1 className="text-4xl font-bold">講義一覧</h1>
          </div>
          <p className="text-muted-foreground text-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
            全30講義で体系的に学習できます
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8 bg-gradient-primary text-primary-foreground relative overflow-hidden animate-scale-in shadow-glow">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">学習進捗</h2>
                <p className="opacity-90">
                  完了済み: 5 / 30 講義 (17%)
                </p>
              </div>
              <div className="text-5xl font-bold animate-pulse">17%</div>
            </div>
            <div className="mt-4 bg-primary-foreground/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary-foreground h-full rounded-full transition-all duration-1000"
                style={{ width: "17%" }}
              />
            </div>
          </div>
        </Card>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card
              key={course.id}
              className="p-6 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer backdrop-blur-sm bg-card/95 border-2 border-transparent hover:border-primary/20 animate-fade-in"
              onClick={() => navigate(`/course/${course.id}`)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg animate-float">
                  {course.id}
                </div>
                {course.completed ? (
                  <CheckCircle className="w-6 h-6 text-primary animate-pulse" />
                ) : (
                  <Clock className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;