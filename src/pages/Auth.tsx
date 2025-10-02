import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PlayCircle, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/courses`,
          },
        });

        if (error) throw error;

        toast({
          title: "アカウント作成完了",
          description: "ログインしています...",
        });
        navigate("/courses");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "ログイン成功",
          description: "コースページへ移動します",
        });
        navigate("/courses");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: error.message || "認証に失敗しました",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />

      {/* Animated particles */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-primary/30 rounded-full animate-float" />
      <div className="absolute bottom-40 right-20 w-4 h-4 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />

      <Card className="w-full max-w-md p-8 shadow-elegant relative z-10 backdrop-blur-sm bg-card/95 animate-scale-in border-2 border-primary/10">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/">
            <div className="flex items-center justify-center gap-2 mb-4">
              <PlayCircle className="w-8 h-8 text-primary animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                オンライン講座
              </span>
            </div>
          </Link>
          <div className="inline-block mb-2">
            <Sparkles className="w-12 h-12 text-primary animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold mb-2 animate-slide-up">
            {isSignUp ? "アカウント作成" : "ログイン"}
          </h1>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {isSignUp
              ? "新しいアカウントを作成して学習を始めましょう"
              : "アカウントにログインしてください"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="transition-all duration-300 focus:scale-105"
            />
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="transition-all duration-300 focus:scale-105"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow animate-fade-in"
            disabled={loading}
            style={{ animationDelay: '0.5s' }}
          >
            {loading
              ? "処理中..."
              : isSignUp
                ? "アカウント作成"
                : "ログイン"}
          </Button>
        </form>

        <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline transition-all duration-300 hover:scale-105 inline-block"
            disabled={loading}
          >
            {isSignUp
              ? "すでにアカウントをお持ちですか？ログイン"
              : "アカウントをお持ちでない方はこちら"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;