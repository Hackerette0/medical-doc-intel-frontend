import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Loader2, X, BadgeCheck } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

// Types
interface AnalysisResult {
  key_analysis: string[];
  tags: { [key: string]: string[] };
  document_type: string;
}

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ [key: string]: AnalysisResult }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles(newFiles);
    setResults({});
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;
    setLoading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:8000/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setResults(prev => ({ ...prev, [file.name]: res.data }));
      } catch (err) {
        console.error('Analysis error:', err);
        alert(`Error analyzing ${file.name}`);
      }
    }
    setLoading(false);
  };

  const openPreview = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsOpen(true);
  };

  const closePreview = () => {
    setIsOpen(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Medical Doc Intel
        </motion.h1>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 p-8"
        >
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-400 transition-all duration-300">
            <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold text-lg block"
            >
              {files.length === 0 ? 'Upload PDFs (1-5 files)' : `${files.length} file(s) selected`}
            </label>
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              {files.map(f => (
                <div key={f.name} className="flex justify-center items-center gap-2 text-xs bg-gray-100 p-2 rounded">
                  <FileText size={12} />
                  {f.name.length > 20 ? f.name.slice(0, 20) + '...' : f.name}
                  <button onClick={() => openPreview(f)} className="text-blue-500 hover:underline">Preview</button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || files.length === 0}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <BadgeCheck size={20} />
                Analyze Documents
              </>
            )}
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {Object.entries(results).map(([filename, result]) => (
            <motion.div
              key={filename}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{filename}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {result.document_type}
                  </span>
                </div>

                {/* Key Insights */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-blue-600">
                    <FileText size={18} />
                    Key Insights
                  </h3>
                  <ul className="space-y-3">
                    {result.key_analysis.map((point, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex gap-3 pl-4 border-l-2 border-blue-200 text-gray-700"
                      >
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-purple-600">
                    <FileText size={18} />
                    Tags
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(result.tags).map(([category, items]) =>
                      items.length > 0 ? (
                        <div key={category} className="space-y-2">
                          <span className="text-xs font-medium capitalize text-gray-500 block">
                            {category.replace('_', ' ')}:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {items.map((tag, i) => (
                              <motion.span
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                                  category.includes('deficiencies')
                                    ? 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200'
                                    : category.includes('conditions')
                                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200'
                                    : 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200'
                                }`}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* PDF Preview Modal */}
        <Transition show={isOpen} as={motion.div} enter="ease-out duration-300" leave="ease-in duration-200">
          <Dialog open={isOpen} onClose={closePreview} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="max-w-4xl max-h-full w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                  <Dialog.Title className="text-lg font-semibold">Preview: {selectedFile?.name}</Dialog.Title>
                  <button onClick={closePreview} className="p-1 hover:bg-gray-200 rounded">
                    <X size={20} />
                  </button>
                </div>
                <iframe src={previewUrl} className="w-full h-[70vh]" title="PDF Preview" />
              </div>
            </div>
          </Dialog>
        </Transition>
      </motion.div>
    </div>
  );
}

export default App;