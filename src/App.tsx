import { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Loader2 } from 'lucide-react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      alert('Error analyzing document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Medical Document Intelligence
        </h1>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <Upload className="mx-auto h-16 w-16 text-gray-400" />
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="mt-4 cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
            >
              {file ? file.name : 'Click to upload PDF'}
            </label>
          </div>

          {file && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Analyzing...
                </>
              ) : (
                'Analyze Document'
              )}
            </button>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Key Insights</h3>
              <ul className="space-y-3">
                {result.key_analysis.map((point: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-blue-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Tags</h3>
              {Object.entries(result.tags).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category} className="mb-4">
                    <span className="capitalize font-medium">{category.replace('_', ' ')}: </span>
                    <span className="text-gray-600">
                      {(items as string[]).join(', ')}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;