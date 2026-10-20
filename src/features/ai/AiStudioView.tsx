import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import {
  Sparkles,
  Wand2,
  Copy,
  Send,
  BookmarkPlus,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Volume2,
} from 'lucide-react';

interface AiStudioViewProps {
  navigate: (path: string) => void;
}

export const AiStudioView: React.FC<AiStudioViewProps> = ({ navigate }) => {
  const { saveAiDraft, aiDrafts, createPost, userProfile } = useAppStore();

  const [topic, setTopic] = useState('How we automated social media publishing across 15 networks');
  const [targetPlatform, setTargetPlatform] = useState('twitter');
  const [tone, setTone] = useState('Authoritative & Energetic');
  const [brandVoice, setBrandVoice] = useState('Social Dominus Tech Lead');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [outputs, setOutputs] = useState<
    { id: string; title: string; text: string; hook: string; chars: number }[]
  >([
    {
      id: 'gen-1',
      title: 'Variant A (Viral Hook & Thread Starter)',
      hook: 'Most brands manage social media backwards.',
      text: 'Most brands manage social media backwards.\n\nThey copy-paste identical captions into 6 tabs, mess up aspect ratios, and burn 15+ hours weekly.\n\nHere is our 4-step framework for unified multi-channel publishing with Social Dominus:\n\n1. Centralized queue slots\n2. Channel-tailored character limits\n3. Pre-flight approval gates\n4. White-label analytics\n\nScale smarter: https://socialdominus.app',
      chars: 362,
    },
    {
      id: 'gen-2',
      title: 'Variant B (Data-Driven Case Study)',
      hook: '40% reduction in marketing overhead.',
      text: 'How scaling agencies cut 40% of campaign overhead while maintaining presence across 15 social gateways.\n\nKey finding: Platform-specific variants outperform generic broadcasts by 3.2x in algorithmic distribution.',
      chars: 228,
    },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newGen = {
        id: `gen-${Date.now()}`,
        title: `Variant C (${tone} for ${PLATFORM_CONFIG[targetPlatform]?.name || targetPlatform})`,
        hook: `Stop wasting hours on manual scheduling.`,
        text: `Stop wasting hours on manual scheduling. Focus on high-leverage content creation.\n\nTopic: ${topic}\n\nOptimized for ${PLATFORM_CONFIG[targetPlatform]?.name}. Ready to schedule!`,
        chars: 180,
      };
      setOutputs([newGen, ...outputs]);
      saveAiDraft(topic, targetPlatform, tone, newGen.text);
    }, 800);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSendToComposer = async (text: string) => {
    await createPost({
      authorId: userProfile.uid,
      authorName: userProfile.displayName,
      content: text,
      channels: [targetPlatform],
      status: 'draft',
      category: 'AI Generated',
      mediaUrls: [],
      aiGenerated: true,
    });
    navigate('/app/compose');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" />
            AI Content Studio
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate high-converting captions, hooks, and platform-adapted variants aligned with your brand voice.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold border border-violet-500/20">
            500 / 500 Monthly AI Credits Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (5 columns) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-violet-500" />
            Generation Parameters
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Topic or Content Objective
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Announcing our 14-day free trial without credit cards..."
              className="w-full p-3 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Platform
              </label>
              <select
                value={targetPlatform}
                onChange={(e) => setTargetPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {Object.entries(PLATFORM_CONFIG).map(([k, c]) => (
                  <option key={k} value={k}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option>Authoritative & Energetic</option>
                <option>Conversational & Casual</option>
                <option>Inspirational & Storytelling</option>
                <option>Technical & Concise</option>
                <option>Humorous & Bold</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Active Brand Voice Profile
            </label>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
              <span className="font-bold text-violet-500 block">{brandVoice}</span>
              <p className="text-[11px] text-slate-500">
                Directives: Never use buzzwords like 'synergy'. Keep sentences snappy and confident.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating Variants...' : 'Generate AI Copy Variants'}</span>
          </button>
        </div>

        {/* Right Output Cards (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider">Generated Output Suggestions</span>
            <span>{outputs.length} Variants Available</span>
          </div>

          <div className="space-y-4">
            {outputs.map((out) => (
              <div
                key={out.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-sm hover:border-violet-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-violet-600 dark:text-violet-400">{out.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{out.chars} characters</span>
                </div>

                <div className="p-2.5 rounded-xl bg-violet-500/5 border border-violet-500/10 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="text-violet-500 text-[10px] uppercase block mb-0.5">Hook Headline:</span>
                  "{out.hook}"
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {out.text}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(out.id, out.text)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    {copiedId === out.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendToComposer(out.text)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Composer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
