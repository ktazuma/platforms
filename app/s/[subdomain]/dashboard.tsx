"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, TrendingUp, DollarSign, Activity, 
  Clock, AlertTriangle, CheckCircle, Settings,
  Filter, Download, RefreshCw, Eye, Calendar,
  Search, Plus, Play, FileText, Mail, BarChart3,
  Database, MessageSquare, Upload, Zap, Grid3X3,
  Tag, Star, ChevronRight, Copy, Edit
} from 'lucide-react';
import { type Subdomain } from '@/lib/subdomains';

export default function Dashboard({ subdomain }: { subdomain: Subdomain }) {
  const [activeTab, setActiveTab] = useState('hub');
  const [selectedPeriod, setSelectedPeriod] = useState('今月');
  const [lastUpdated] = useState('2025-08-05 15:30');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [executionModal, setExecutionModal] = useState<any>(null);
  const [creationModal, setCreationModal] = useState(false);

  // ワークフローデータ
  const workflowTemplates = [
    {
      id: 'WF-TEMPLATE-001',
      title: '請求書PDFを会計システムに自動登録',
      description: '受け取った請求書PDFをアップロードすると、内容を読み取って会計システムに転記します',
      category: '経理・財務',
      icon: FileText,
      executionType: 'upload', // upload, input, instant
      tags: ['#経理', '#自動化レベル3', '#PDF処理'],
      popularity: 4.8,
      executionCount: 1250,
      isFavorite: true
    },
    {
      id: 'WF-TEMPLATE-002',
      title: '会議議事録の自動要約・配布',
      description: '会議の音声ファイルまたはテキストから、要約を作成してチームメンバーに配布します',
      category: '業務効率化',
      icon: MessageSquare,
      executionType: 'upload',
      tags: ['#会議', '#要約', '#自動配布'],
      popularity: 4.6,
      executionCount: 890,
      isFavorite: false
    },
    {
      id: 'WF-TEMPLATE-003',
      title: '顧客問い合わせメールの自動分類・返信',
      description: '受信したメールを内容に応じて分類し、適切な部署に振り分け、初回返信を自動送信します',
      category: 'カスタマーサポート',
      icon: Mail,
      executionType: 'instant',
      tags: ['#メール', '#分類', '#自動返信'],
      popularity: 4.7,
      executionCount: 2100,
      isFavorite: true
    },
    {
      id: 'WF-TEMPLATE-004',
      title: 'Webサイト情報の定期収集・レポート',
      description: '競合他社のWebサイトから価格情報や新着情報を定期的に収集し、レポートを作成します',
      category: 'マーケティング',
      icon: BarChart3,
      executionType: 'input',
      tags: ['#Web収集', '#競合分析', '#レポート'],
      popularity: 4.4,
      executionCount: 320,
      isFavorite: false
    },
    {
      id: 'WF-TEMPLATE-005',
      title: '在庫データの自動更新・アラート',
      description: '複数の在庫管理システムからデータを収集し、統合レポートを作成、アラートを配信します',
      category: '在庫管理',
      icon: Database,
      executionType: 'instant',
      tags: ['#在庫', '#データ統合', '#アラート'],
      popularity: 4.5,
      executionCount: 720,
      isFavorite: false
    },
    {
      id: 'WF-TEMPLATE-006',
      title: '新入社員オンボーディング自動化',
      description: '新入社員の入社手続きを自動化し、必要な資料送付やアカウント作成を行います',
      category: '人事・労務',
      icon: Users,
      executionType: 'input',
      tags: ['#人事', '#オンボーディング', '#自動化'],
      popularity: 4.3,
      executionCount: 150,
      isFavorite: true
    }
  ];

  // カテゴリー一覧
  const categories = [
    { id: 'all', name: 'すべて', count: workflowTemplates.length },
    { id: '経理・財務', name: '経理・財務', count: 1 },
    { id: '業務効率化', name: '業務効率化', count: 1 },
    { id: 'カスタマーサポート', name: 'カスタマーサポート', count: 1 },
    { id: 'マーケティング', name: 'マーケティング', count: 1 },
    { id: '在庫管理', name: '在庫管理', count: 1 },
    { id: '人事・労務', name: '人事・労務', count: 1 }
  ];

  // ユーザーのワークフロー（よく使うもの）
  const userWorkflows = workflowTemplates.filter(wf => wf.isFavorite);

  // ワークフロー作成テンプレート
  const creationTemplates = [
    { 
      id: 'temp-1', 
      title: '議事録の要約', 
      description: 'テキストや音声から会議の要点を抽出',
      icon: MessageSquare,
      complexity: '初級'
    },
    { 
      id: 'temp-2', 
      title: 'Webサイト情報の収集', 
      description: '指定したWebサイトから定期的にデータを取得',
      icon: Database,
      complexity: '中級'
    },
    { 
      id: 'temp-3', 
      title: '問い合わせメールの自動返信', 
      description: 'メール内容を分析して適切な返信を自動生成',
      icon: Mail,
      complexity: '上級'
    },
    { 
      id: 'temp-4', 
      title: 'データ変換・統合', 
      description: '複数のデータソースを統合して新しい形式で出力',
      icon: BarChart3,
      complexity: '中級'
    }
  ];

  // フィルタリング関数
  const getFilteredWorkflows = () => {
    let filtered = workflowTemplates;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(wf => wf.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(wf => 
        wf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wf.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  // ワークフロー実行処理
  const handleExecuteWorkflow = (workflow: any) => {
    if (workflow.executionType === 'instant') {
      // ワンクリック実行
      alert(`${workflow.title} を実行中です...`);
      setTimeout(() => {
        alert(`${workflow.title} が完了しました！`);
      }, 2000);
    } else {
      // モーダルで詳細入力
      setExecutionModal(workflow);
    }
  };

  // 実行モーダルの処理
  const handleModalExecution = () => {
    alert(`${executionModal.title} を実行中です...`);
    setExecutionModal(null);
    setTimeout(() => {
      alert(`実行が完了しました！`);
    }, 2000);
  };

  // 経営層向けKPIデータ（要件定義書に基づく）
  const executiveKPIs = {
    roi: 245, // ROI (%)
    totalCostSaving: 3200000, // 総コスト削減額 (円)
    totalTimeSaving: 1850, // 総削減時間 (時間)
    overallSuccessRate: 94.2 // 全体成功率 (%)
  };

  // ROI・コスト削減額の推移データ
  const roiTrendData = [
    { month: '1月', roi: 180, costSaving: 2100000 },
    { month: '2月', roi: 195, costSaving: 2300000 },
    { month: '3月', roi: 210, costSaving: 2650000 },
    { month: '4月', roi: 225, costSaving: 2800000 },
    { month: '5月', roi: 235, costSaving: 3000000 },
    { month: '6月', roi: 245, costSaving: 3200000 },
  ];

  // 主要業務プロセス別効率化貢献度
  const processContributionData = [
    { name: '請求書処理', contribution: 35, color: '#007bff' },
    { name: '在庫管理', contribution: 25, color: '#28a745' },
    { name: '顧客対応', contribution: 20, color: '#ffc107' },
    { name: 'レポート作成', contribution: 15, color: '#dc3545' },
    { name: 'その他', contribution: 5, color: '#6c757d' },
  ];

  // 業務フロー別パフォーマンスデータ（マネージャー向け）
  const workflowPerformanceData = [
    {
      id: 'WF-001',
      name: '請求書自動処理',
      status: '稼働中',
      executionCount: 1250,
      successRate: 96.5,
      avgProcessingTime: '2.3分',
      assignee: '田中太郎'
    },
    {
      id: 'WF-002', 
      name: '在庫レベル監視',
      status: '稼働中',
      executionCount: 890,
      successRate: 94.2,
      avgProcessingTime: '1.8分',
      assignee: '佐藤花子'
    },
    {
      id: 'WF-003',
      name: '顧客問い合わせ分類',
      status: '稼働中',
      executionCount: 2100,
      successRate: 87.3,
      avgProcessingTime: '0.5分',
      assignee: '山田次郎'
    },
    {
      id: 'WF-004',
      name: '月次レポート生成',
      status: '停止中',
      executionCount: 45,
      successRate: 100.0,
      avgProcessingTime: '15.2分',
      assignee: '鈴木三郎'
    },
    {
      id: 'WF-005',
      name: 'データバックアップ',
      status: '稼働中',
      executionCount: 720,
      successRate: 99.8,
      avgProcessingTime: '3.1分',
      assignee: '田中太郎'
    }
  ];

  // エラー発生トレンドデータ
  const errorTrendData = [
    { date: '8/1', errors: 12, apiErrors: 5, dataErrors: 4, systemErrors: 3 },
    { date: '8/2', errors: 8, apiErrors: 3, dataErrors: 2, systemErrors: 3 },
    { date: '8/3', errors: 15, apiErrors: 7, dataErrors: 5, systemErrors: 3 },
    { date: '8/4', errors: 6, apiErrors: 2, dataErrors: 2, systemErrors: 2 },
    { date: '8/5', errors: 10, apiErrors: 4, dataErrors: 3, systemErrors: 3 },
  ];

  // 担当者別パフォーマンスデータ
  const memberPerformanceData = [
    { name: '田中太郎', processedCount: 320, errorRate: 2.1 },
    { name: '佐藤花子', processedCount: 280, errorRate: 1.8 },
    { name: '山田次郎', processedCount: 450, errorRate: 3.2 },
    { name: '鈴木三郎', processedCount: 190, errorRate: 0.5 },
  ];

  // 現場担当者の直近業務ログ
  const recentWorkLogs = [
    { datetime: '2025-08-05 15:25', workflow: '請求書処理', result: '成功', details: 'REQ-2025-0805-001' },
    { datetime: '2025-08-05 15:20', workflow: '在庫確認', result: '成功', details: 'SKU-12345の在庫更新' },
    { datetime: '2025-08-05 15:15', workflow: '顧客情報更新', result: '失敗', details: 'API接続エラー' },
    { datetime: '2025-08-05 15:10', workflow: 'レポート生成', result: '成功', details: '日次売上レポート' },
    { datetime: '2025-08-05 15:05', workflow: '請求書処理', result: '成功', details: 'REQ-2025-0805-002' },
  ];

  // 要対応エラー一覧
  const pendingErrors = [
    { datetime: '2025-08-05 14:30', workflow: '顧客情報更新', error: 'API接続タイムアウト', severity: 'high' },
    { datetime: '2025-08-05 13:45', workflow: '在庫管理', error: 'データ形式不正', severity: 'medium' },
    { datetime: '2025-08-05 12:20', workflow: 'レポート生成', error: 'テンプレート読み込みエラー', severity: 'low' },
    { datetime: '2025-08-05 11:15', workflow: '請求書処理', error: 'PDF生成失敗', severity: 'medium' },
  ];

  // ドリルダウン詳細データ
  const getWorkflowDetails = (workflowId: string) => {
    const details = [
      { datetime: '2025-08-05 15:30', executor: '田中太郎', result: '成功', duration: '2.1分', details: 'REQ-001処理完了' },
      { datetime: '2025-08-05 15:25', executor: '田中太郎', result: '成功', duration: '2.3分', details: 'REQ-002処理完了' },
      { datetime: '2025-08-05 15:20', executor: '佐藤花子', result: '失敗', duration: '1.8分', details: 'API接続エラー' },
      { datetime: '2025-08-05 15:15', executor: '田中太郎', result: '成功', duration: '2.0分', details: 'REQ-003処理完了' },
      { datetime: '2025-08-05 15:10', executor: '山田次郎', result: '成功', duration: '2.5分', details: 'REQ-004処理完了' },
    ];
    return details;
  };

  const WorkflowHub = () => (
    <div className="space-y-8">
      {/* 検索バー */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ワークフローを検索... (例: 請求書, メール分類, データ収集)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-base"
          />
        </div>
        <Button 
          size="lg" 
          className="ml-4 bg-blue-600 hover:bg-blue-700"
          onClick={() => setCreationModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          新しい業務フローを作成する
        </Button>
      </div>

      {/* カテゴリーフィルター */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* あなたのワークフロー */}
      {userWorkflows.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-semibold">あなたのワークフロー</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userWorkflows.map((workflow) => {
              const IconComponent = workflow.icon;
              return (
                <Card key={workflow.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">{workflow.popularity}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 line-clamp-2">{workflow.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{workflow.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {workflow.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {workflow.executionCount.toLocaleString()} 回実行
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleExecuteWorkflow(workflow)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        実行する
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ワークフローカタログ */}
      <div>
        <div className="flex items-center mb-4">
          <Grid3X3 className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold">ワークフローカタログ</h2>
          <span className="ml-2 text-sm text-muted-foreground">
            ({getFilteredWorkflows().length} 件)
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredWorkflows().map((workflow) => {
            const IconComponent = workflow.icon;
            return (
              <Card key={workflow.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${workflow.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        <span className="text-sm text-muted-foreground">{workflow.popularity}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {workflow.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{workflow.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{workflow.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {workflow.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {workflow.executionCount.toLocaleString()} 回実行
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-3 h-3 mr-1" />
                        複製
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleExecuteWorkflow(workflow)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        実行
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

  const ExecutiveDashboard = () => (
    <div className="space-y-8">
      {/* 第1段：主要KPIスコアカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">全体ROI</p>
                <h3 className="text-3xl font-semibold">{executiveKPIs.roi}%</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">総コスト削減額</p>
                <h3 className="text-3xl font-semibold">¥{(executiveKPIs.totalCostSaving / 1000000).toFixed(1)}M</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+15.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">総削減時間</p>
                <h3 className="text-3xl font-semibold">{executiveKPIs.totalTimeSaving}h</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">全体成功率</p>
                <h3 className="text-3xl font-semibold">{executiveKPIs.overallSuccessRate}%</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 第2段：グラフエリア */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ROI・コスト削減額の推移（複合グラフ） */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">ROI・コスト削減額の推移</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              詳細設定
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={roiTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#212529',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="right"
                  dataKey="costSaving" 
                  fill="#007bff" 
                  name="コスト削減額 (円)"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="roi" 
                  stroke="#28a745" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  name="ROI (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 主要業務プロセス別効率化貢献度 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">業務プロセス別貢献度</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={processContributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="contribution"
                >
                  {processContributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#212529',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ManagerDashboard = () => (
    <div className="space-y-8">
      {/* 第1段：業務フロー別パフォーマンス一覧テーブル */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">業務フロー別パフォーマンス一覧</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              エクスポート
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>業務フロー名</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">実行回数</TableHead>
                <TableHead className="text-right">成功率</TableHead>
                <TableHead className="text-right">平均処理時間</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflowPerformanceData.map((workflow) => (
                <TableRow 
                  key={workflow.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell>
                    <Badge variant={workflow.status === '稼働中' ? 'default' : 'secondary'}>
                      {workflow.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{workflow.executionCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={workflow.successRate < 90 ? 'text-red-600' : workflow.successRate < 95 ? 'text-yellow-600' : 'text-green-600'}>
                      {workflow.successRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={parseFloat(workflow.avgProcessingTime) > 10 ? 'text-red-600' : 'text-foreground'}>
                      {workflow.avgProcessingTime}
                    </span>
                  </TableCell>
                  <TableCell>{workflow.assignee}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          詳細
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{workflow.name} - 実行ログ詳細</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>実行日時</TableHead>
                                <TableHead>実行者</TableHead>
                                <TableHead>結果</TableHead>
                                <TableHead>処理時間</TableHead>
                                <TableHead>詳細</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getWorkflowDetails(workflow.id).map((log, index) => (
                                <TableRow key={index}>
                                  <TableCell>{log.datetime}</TableCell>
                                  <TableCell>{log.executor}</TableCell>
                                  <TableCell>
                                    <Badge variant={log.result === '成功' ? 'default' : 'destructive'}>
                                      {log.result}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{log.duration}</TableCell>
                                  <TableCell>{log.details}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 第2段：エラー発生トレンドと担当者別パフォーマンス */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* エラー発生トレンドと内訳 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">エラー発生トレンド</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={errorTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#212529',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend />
                <Bar dataKey="apiErrors" stackId="a" fill="#dc3545" name="API エラー" />
                <Bar dataKey="dataErrors" stackId="a" fill="#ffc107" name="データエラー" />
                <Bar dataKey="systemErrors" stackId="a" fill="#6c757d" name="システムエラー" />
                <Line 
                  type="monotone" 
                  dataKey="errors" 
                  stroke="#007bff" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="総エラー数"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 担当者別パフォーマンス */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">担当者別パフォーマンス</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={memberPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#212529',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="processedCount" 
                  fill="#007bff" 
                  name="処理件数"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="errorRate" 
                  stroke="#dc3545" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  name="エラー率 (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const OperatorDashboard = () => (
    <div className="space-y-8">
      {/* 第1段：個人パフォーマンススコアカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">総処理件数</p>
                <h3 className="text-3xl font-semibold">47</h3>
                <p className="text-sm text-green-600 mt-1">目標: 50件</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">平均処理時間</p>
                <h3 className="text-3xl font-semibold">8.2分</h3>
                <p className="text-sm text-green-600 mt-1">前日: 9.1分</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">エラー率</p>
                <h3 className="text-3xl font-semibold">1.2%</h3>
                <p className="text-sm text-red-600 mt-1">前日: 2.1%</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 第2段：直近の担当業務ログと要対応エラー一覧 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 直近の担当業務ログ */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">直近の担当業務ログ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    log.result === '成功' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{log.workflow}</p>
                      <Badge variant={log.result === '成功' ? 'default' : 'destructive'}>
                        {log.result}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.datetime}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 要対応エラー一覧 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">要対応エラー一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingErrors.map((error, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{error.workflow}</p>
                      <p className="text-xs text-muted-foreground">{error.datetime}</p>
                    </div>
                    <Badge 
                      variant={
                        error.severity === 'high' ? 'destructive' : 
                        error.severity === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {error.severity === 'high' ? '高' : error.severity === 'medium' ? '中' : '低'}
                    </Badge>
                  </div>
                  <p className="text-sm text-red-600 mb-2">{error.error}</p>
                  <Button size="sm" variant="outline">
                    対応する
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold">{subdomain.name}の業務自動化プラットフォーム</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hub">ワークフローハブ</TabsTrigger>
                <TabsTrigger value="executive">経営サマリー</TabsTrigger>
                <TabsTrigger value="manager">部門パフォーマンス</TabsTrigger>
                <TabsTrigger value="operator">マイダッシュボード</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-4">
            {/* 期間フィルター（ダッシュボードタブでのみ表示） */}
            {activeTab !== 'hub' && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="今日">今日</SelectItem>
                    <SelectItem value="今週">今週</SelectItem>
                    <SelectItem value="今月">今月</SelectItem>
                    <SelectItem value="任意期間">任意期間</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {activeTab !== 'hub' && (
              <div className="text-sm text-muted-foreground">
                最終更新: {lastUpdated}
              </div>
            )}
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              エクスポート
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="px-6 py-8">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="hub" className="mt-0">
            <WorkflowHub />
          </TabsContent>
          <TabsContent value="executive" className="mt-0">
            <ExecutiveDashboard />
          </TabsContent>
          <TabsContent value="manager" className="mt-0">
            <ManagerDashboard />
          </TabsContent>
          <TabsContent value="operator" className="mt-0">
            <OperatorDashboard />
          </TabsContent>
        </Tabs>
      </main>

      {/* 実行モーダル */}
      <Dialog open={!!executionModal} onOpenChange={() => setExecutionModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {executionModal && <executionModal.icon className="w-5 h-5 text-blue-600" />}
              {executionModal?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">{executionModal?.description}</p>
            
            {executionModal?.executionType === 'upload' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  ファイルをここにドラッグ＆ドロップしてください
                </p>
                <Button variant="outline" className="mt-2">
                  ファイルを選択
                </Button>
              </div>
            )}
            
            {executionModal?.executionType === 'input' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">処理対象のテキストを入力してください</label>
                  <Textarea 
                    placeholder="ここにテキストを貼り付けまたは入力してください..."
                    rows={6}
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setExecutionModal(null)}>
                キャンセル
              </Button>
              <Button onClick={handleModalExecution} className="bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                実行開始
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 作成モーダル */}
      <Dialog open={creationModal} onOpenChange={setCreationModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>どのような業務フローを作成しますか？</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">テンプレートから作成</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creationTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{template.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {template.complexity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">空白から作成</h3>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">完全にゼロから作成</h4>
                      <p className="text-sm text-muted-foreground">
                        Dify/n8nエディタで独自のワークフローを構築します
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">上級者向け</Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setCreationModal(false)}>
                キャンセル
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
