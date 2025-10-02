import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PlayCircle,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import patternBg from "@/assets/pattern-bg.jpg";

const CourseDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: string; content: string }>
  >([
    {
      role: "assistant",
      content: "こんにちは！講義について質問があればお答えします。",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([
        ...chatHistory,
        { role: "user", content: chatMessage },
        {
          role: "assistant",
          content: "ご質問ありがとうございます。この機能は実装中です。",
        },
      ]);
      setChatMessage("");
    }
  };

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
        <div className="absolute top-20 right-10 w-3 h-3 bg-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border relative z-10 animate-slide-in-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/courses")}
            className="hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            講義一覧に戻る
          </Button>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              オンライン講座
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <Card className="aspect-video bg-gradient-primary flex items-center justify-center overflow-hidden relative animate-scale-in shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="text-center relative z-10">
                <PlayCircle className="w-20 h-20 text-primary-foreground mx-auto mb-4 animate-bounce" />
                <p className="text-primary-foreground text-lg font-semibold">
                  動画プレーヤー（実装予定）
                </p>
              </div>
            </Card>

            {/* Course Info */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-primary animate-bounce" />
                <h1 className="text-3xl font-bold">
                  第{id}講：講義タイトル {id}
                </h1>
              </div>
              <p className="text-muted-foreground mb-6">
                この講義では、重要なトピックについて詳しく学習します。
                具体的な例を交えながら、実践的なスキルを身につけていきましょう。
              </p>
              <Button className="bg-gradient-primary shadow-glow hover:scale-105 transition-all duration-300">
                <CheckCircle className="w-4 h-4 mr-2" />
                完了としてマーク
              </Button>
            </div>

            {/* Tabs for Chat and Quiz */}
            <Tabs defaultValue="chat" className="w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat" className="transition-all duration-300 hover:scale-105">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AIチャット
                </TabsTrigger>
                <TabsTrigger value="quiz" className="transition-all duration-300 hover:scale-105">
                  <FileText className="w-4 h-4 mr-2" />
                  理解度テスト
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat">
                <Card className="p-6 backdrop-blur-sm bg-card/95">
                  <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex animate-fade-in ${
                          msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 transition-all duration-300 hover:scale-105 ${
                            msg.role === "user"
                              ? "bg-gradient-primary text-primary-foreground shadow-glow"
                              : "bg-muted"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="質問を入力してください..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="transition-all duration-300 focus:scale-105"
                    />
                    <Button onClick={handleSendMessage} className="hover:scale-110 transition-transform">
                      送信
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="quiz">
                <Card className="p-6 backdrop-blur-sm bg-card/95">
                  <h3 className="text-xl font-semibold mb-4">
                    理解度テスト
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    この機能は実装中です。
                    講義の内容を確認するためのテストをここで受けることができます。
                  </p>
                  <Button variant="outline" className="hover:scale-105 transition-transform">
                    テストを開始
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 backdrop-blur-sm bg-card/95 animate-fade-in hover:shadow-elegant transition-all duration-300" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-4">コース概要</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    講義時間
                  </p>
                  <p className="font-semibold">15分</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">難易度</p>
                  <p className="font-semibold">中級</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">進捗</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-full rounded-full transition-all duration-1000"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <span className="text-sm font-semibold">0%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card/95 animate-fade-in hover:shadow-elegant transition-all duration-300" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl font-semibold mb-4">関連講義</h3>
              <div className="space-y-3">
                {[
                  Number(id) - 1,
                  Number(id) + 1,
                  Number(id) + 2,
                ].map((courseId, index) => {
                  if (courseId < 1 || courseId > 30) return null;
                  return (
                    <button
                      key={courseId}
                      onClick={() => navigate(`/course/${courseId}`)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
                    >
                      <p className="font-semibold text-sm">
                        第{courseId}講：講義タイトル {courseId}
                      </p>
                      <p className="text-xs text-muted-foreground">15分</p>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;