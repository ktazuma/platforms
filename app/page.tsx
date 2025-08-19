import { SubdomainForm } from './subdomain-form';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            あなたのビジネスに、最高のダッシュボードを。
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Vercel Platformsを利用した、マルチテナント対応の業務改善プラットフォーム。今すぐあなたのサブドメインを作成しましょう。
          </p>
        </header>

        <main>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              無料で始める
            </h2>
            <SubdomainForm />
          </div>
        </main>

        <footer className="text-center mt-12">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} 業務改善プラットフォーム. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
