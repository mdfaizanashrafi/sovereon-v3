/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { fetchAllPosts, SanityPost } from '../lib/sanity';
import { Database, Server, Terminal, CheckCircle, AlertTriangle, RefreshCw, ArrowLeft, ExternalLink } from 'lucide-react';

export default function SanityTestSection() {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchCount, setRefetchCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchAllPosts()
      .then((data) => {
        if (isMounted) {
          setPosts(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Sanity Connection Error:', err);
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [refetchCount]);

  const handleRetry = () => {
    setRefetchCount((prev) => prev + 1);
  };

  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '4q6e8p6c';
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-07-03';

  return (
    <div className="w-full bg-brand-bg py-16 px-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Breadcrumb */}
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold text-brand-gray hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO CENTRAL COMMAND</span>
          </a>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border border-brand-border/60 p-8 rounded-2xl shadow-sm mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold text-brand-orange uppercase tracking-wider">// SYSTEM_INTEGRATION_TEST</span>
              <h1 className="font-display text-2xl font-bold text-brand-dark">Sanity CMS Connection Centre</h1>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-brand-gray/90 max-w-2xl font-medium">
            This module establishes a connection to the headless Sanity.io API to dynamically pull structured briefings, metadata schemas, and topic clusters under the Sovereon LLP framework.
          </p>

          {/* Connection Metadata Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-brand-border/40 font-mono text-[10px]">
            <div className="flex items-center space-x-2.5 bg-brand-bg/50 p-3 rounded-lg border border-brand-border/40">
              <Server className="h-4 w-4 text-brand-gray" />
              <div>
                <span className="block text-[8px] text-brand-gray uppercase font-bold">PROJECT_ID</span>
                <span className="font-semibold text-brand-dark">{projectId}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 bg-brand-bg/50 p-3 rounded-lg border border-brand-border/40">
              <Database className="h-4 w-4 text-brand-gray" />
              <div>
                <span className="block text-[8px] text-brand-gray uppercase font-bold">DATASET</span>
                <span className="font-semibold text-brand-dark">{dataset}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 bg-brand-bg/50 p-3 rounded-lg border border-brand-border/40">
              <Terminal className="h-4 w-4 text-brand-gray" />
              <div>
                <span className="block text-[8px] text-brand-gray uppercase font-bold">API_VERSION</span>
                <span className="font-semibold text-brand-dark">{apiVersion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status & Payload */}
        <div className="space-y-6">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-[11px] font-bold text-brand-dark uppercase tracking-wider flex items-center space-x-1.5">
              <span>DATABASE_QUERY_RESPONSE</span>
              <span className="text-brand-border">|</span>
              <span className="text-brand-gray font-normal">*[_type == "post"]</span>
            </h2>

            <button
              onClick={handleRetry}
              disabled={loading}
              className="inline-flex items-center space-x-1.5 rounded-full border border-brand-border/80 bg-white px-4 py-1.5 font-mono text-[10px] font-bold text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>TRIGGER_QUERY</span>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="border border-brand-border/40 rounded-xl bg-white p-12 text-center space-y-3">
              <RefreshCw className="h-8 w-8 text-brand-orange animate-spin mx-auto" />
              <p className="font-mono text-xs text-brand-gray font-bold uppercase tracking-wider">// COMMUNICATING_WITH_SANITY_SERVERS</p>
              <p className="text-[10px] text-brand-gray/80 max-w-sm mx-auto">Please wait while our systems execute the database query and parse the JSON response.</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="border border-red-200/60 rounded-xl bg-red-50/20 p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm text-red-800">Connection Handshake Failed</h3>
                  <p className="text-[11px] leading-relaxed text-red-700/90 font-medium">
                    The query could not be completed successfully. This is usually due to CORS rules on Sanity or invalid project credentials.
                  </p>
                </div>
              </div>

              {/* Technical Logs */}
              <div className="rounded-lg bg-black/95 p-4 font-mono text-[10px] text-red-400 overflow-x-auto whitespace-pre">
                {`[ERROR_LOG] ${error}`}
              </div>

              {/* Resolution Guideline */}
              <div className="text-[11px] text-brand-gray/90 space-y-2 border-t border-brand-border/40 pt-4">
                <p className="font-bold uppercase text-brand-dark text-[10px]">// REQUIRED CORS ACCESS STEPS:</p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Go to your Sanity Management Console (<a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-bold hover:underline inline-flex items-center space-x-0.5"><span>sanity.io/manage</span><ExternalLink className="h-3 w-3" /></a>).</li>
                  <li>Select project <code className="bg-brand-bg px-1.5 py-0.5 rounded text-brand-orange font-bold font-mono">4q6e8p6c</code>.</li>
                  <li>Navigate to <strong className="text-brand-dark">API settings → CORS origins</strong>.</li>
                  <li>Click <strong className="text-brand-dark">Add CORS origin</strong>, enter this app's URL, check <strong className="text-brand-dark">Allow credentials</strong>, and save.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Empty / Success State */}
          {!loading && !error && (
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="border border-brand-border/40 rounded-xl bg-white p-12 text-center space-y-3">
                  <CheckCircle className="h-8 w-8 text-brand-orange mx-auto opacity-70" />
                  <p className="font-mono text-xs text-brand-dark font-bold uppercase tracking-wider">// CONNECTION_SUCCESSFUL</p>
                  <p className="text-[11px] text-brand-gray max-w-md mx-auto leading-relaxed">
                    Connected to dataset <code className="bg-brand-bg text-brand-orange px-1 py-0.5 rounded font-mono text-[10px] font-bold">production</code> but the collection returned <strong className="text-brand-dark">0 documents</strong> of type <code className="bg-brand-bg text-brand-orange px-1 py-0.5 rounded font-mono text-[10px] font-bold">"post"</code>.
                  </p>
                  <p className="text-[10px] text-brand-gray/80 max-w-sm mx-auto">
                    Ensure you have published at least one document of schema type <code className="font-mono">"post"</code> in your Sanity Studio.
                  </p>
                </div>
              ) : (
                <div className="border border-brand-border/60 rounded-xl bg-white overflow-hidden shadow-sm">
                  {/* Status Banner */}
                  <div className="bg-brand-orange/5 border-b border-brand-border/40 p-4 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-orange" />
                    <span className="font-mono text-[10px] font-bold text-brand-orange uppercase">STATUS: ACTIVE // {posts.length} SYSTEMS BRIEFINGS LOGGED</span>
                  </div>

                  {/* List of fetched items */}
                  <div className="divide-y divide-brand-border/40">
                    {posts.map((post) => (
                      <div key={post._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-brand-bg/10 transition-colors">
                        <div className="space-y-1">
                          <h3 className="font-display font-bold text-sm text-brand-dark">{post.title}</h3>
                          <div className="flex items-center space-x-1.5 font-mono text-[9px] text-brand-gray uppercase">
                            <span>ID:</span>
                            <span className="text-brand-dark/80">{post._id}</span>
                          </div>
                        </div>

                        <div className="mt-2 sm:mt-0">
                          <span className="inline-flex items-center rounded bg-brand-bg border border-brand-border/60 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-orange uppercase">
                            slug: {post.slug}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
