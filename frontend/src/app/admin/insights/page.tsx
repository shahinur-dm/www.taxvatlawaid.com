'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { api, extractErrorMessage } from '@/lib/api';
import { ARTICLE_CATEGORIES, ArticleCategory, ArticleItem } from '@/types';

export default function AdminInsightsPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('Tax Updates');
  const [statutoryReference, setStatutoryReference] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; data: ArticleItem[] }>(
        '/admin/articles'
      );
      setArticles(res.data.data || []);
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to load articles.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/admin/articles', {
        title: title.trim(),
        category,
        statutoryReference: statutoryReference.trim(),
        summary: summary.trim(),
        content: content.trim(),
        isPublished,
      });
      toast.success('Article saved successfully.');
      setTitle('');
      setStatutoryReference('');
      setSummary('');
      setContent('');
      await loadArticles();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to create article.'));
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (article: ArticleItem) => {
    try {
      await api.patch(`/admin/articles/${article._id}`, {
        isPublished: !article.isPublished,
      });
      toast.success(article.isPublished ? 'Unpublished article.' : 'Published article.');
      await loadArticles();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to update article.'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article permanently?')) return;
    try {
      await api.delete(`/admin/articles/${id}`);
      toast.success('Article deleted.');
      await loadArticles();
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to delete article.'));
    }
  };

  return (
    <AdminShell
      title="Insights & Legal Knowledge Center"
      subtitle="Publish verified tax, VAT, customs, RJSC, and statutory briefings"
    >
      <div className="space-y-6">
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-navy-800" />
            <h2 className="text-base font-extrabold text-navy-800">
              Publish New Legal Briefing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                minLength={5}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Statutory Overview of Input Tax Credit Documentation"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none focus:border-navy-800"
              >
                {ARTICLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Statutory / SRO Reference (Optional)
            </label>
            <input
              type="text"
              value={statutoryReference}
              onChange={(e) => setStatutoryReference(e.target.value)}
              placeholder="e.g., VAT & SD Act, 2012 · Sec. 46 / SRO Reference"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Executive Summary *
            </label>
            <textarea
              required
              minLength={10}
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief factual overview displayed on listing cards..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Full Article Body *
            </label>
            <textarea
              required
              minLength={20}
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write verified legal commentary and procedural notes..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-800"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>Publish immediately on public website</span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Save Article</span>
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-extrabold text-navy-800 mb-4">
            Published &amp; Draft Articles ({articles.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-navy-800" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              No articles published yet. Create your first verified briefing above.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-navy-800">
                        {article.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-semibold ${
                          article.isPublished
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {article.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{article.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{article.summary}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => togglePublish(article)}
                      className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                    >
                      {article.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(article._id)}
                      className="p-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50"
                      aria-label="Delete article"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
