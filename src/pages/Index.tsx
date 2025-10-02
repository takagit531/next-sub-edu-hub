import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, CheckCircle, PlayCircle, TrendingUp, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import patternBg from "@/assets/pattern-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "30本の講義動画",
      description: "体系的に学べる高品質な講義コンテンツ"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AIチャットボット",
      description: "24時間いつでも質問できるAIアシスタント"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "理解度テスト",
      description: "学習の進捗を確認できるテスト機能"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "進捗管理",
      description: "学習の進み具合を可視化"
    }
  ];

  const plans = [
    {
      name: "ベーシック",
      price: "¥9,800",
      period: "/月",
      features: [
        "全30本の講義動画",
        "AIチャットボット",
        "理解度テスト",
        "学習進捗管理"
      ],
      popular: false
    },
    {
      name: "プレミアム",
      price: "¥29,800",
      period: "/3ヶ月",
      features: [
        "全30本の講義動画",
        "AIチャットボット（優先対応）",
        "理解度テスト",
        "学習進捗管理",
        "個別サポート",
        "修了証明書"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 animate-slide-in-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              オンライン講座
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
              特徴
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
              料金
            </a>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">ログイン</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-gradient-primary hover:scale-105 transition-transform shadow-glow">今すぐ始める</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-block mb-6 animate-bounce">
              <Sparkles className="w-16 h-16 text-primary mx-auto" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-slide-up">
              あなたのスキルを
              <br />
              次のレベルへ
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              30本の体系的な講義動画とAIチャットボットで、
              効率的に学習を進められます
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary shadow-glow hover:scale-110 transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" />
                  無料で始める
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <PlayCircle className="w-5 h-5 mr-2" />
                サンプル動画を見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-20 px-4 relative"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-muted/90" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">充実の学習機能</h2>
            <p className="text-muted-foreground text-lg">
              最新のテクノロジーで最高の学習体験を提供します
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in backdrop-blur-sm bg-card/95"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground mb-4 animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">シンプルな料金プラン</h2>
            <p className="text-muted-foreground text-lg">
              あなたに合ったプランをお選びください
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 relative transition-all duration-500 hover:-translate-y-2 animate-fade-in ${
                  plan.popular
                    ? "border-2 border-primary shadow-glow hover:shadow-[0_0_60px_hsl(var(--primary-glow)/0.6)]"
                    : "hover:shadow-elegant"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                    おすすめ
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${(featureIndex * 0.1) + 0.3}s` }}>
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth" className="block">
                  <Button
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      plan.popular ? "bg-gradient-primary shadow-glow" : ""
                    }`}
                  >
                    今すぐ始める
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-4 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PlayCircle className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">オンライン講座</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 オンライン講座. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;