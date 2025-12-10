import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthStatus, Project } from '../types';
import { generateContent } from '../services/geminiService';
import { supabase } from '../services/supabase';
import { Plus, Trash2, Wand2, Save, Pencil, X, Github, Download, Upload, Image as ImageIcon, CheckCircle, AlertTriangle, Database, HardDrive } from 'lucide-react';

export const Admin: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.LOGGED_OUT);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Redirect if not accessed via secret shortcut
  useEffect(() => {
    const isAuthorized = sessionStorage.getItem('admin_secret_access') === 'true';
    if (!isAuthorized) {
      navigate('/');
    }
  }, [navigate]);



  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    tags: [],
    imageUrl: '',
    repoUrl: ''
  });

  // Fetch Projects from Supabase on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedProjects: Project[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        tags: item.tags || [],
        imageUrl: item.image_url,
        repoUrl: item.repo_url,
        caseStudy: item.case_study,
        videoUrl: item.video_url
      }));
      setProjects(mappedProjects);
    } catch (err) {
      console.error('Supabase fetch failed:', err);
      // No fallback
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin22@') {
      setAuthStatus(AuthStatus.LOGGED_IN);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Optimistic update
        setProjects(projects.filter(p => p.id !== id));
        if (editingId === id) resetForm();
        setSuccessMessage('Project deleted successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err: any) {
        console.error('Error deleting:', err);
        setErrorMessage('Failed to delete project.');
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setProjectForm({
      title: project.title,
      description: project.description,
      tags: project.tags,
      imageUrl: project.imageUrl,
      caseStudy: project.caseStudy,
      repoUrl: project.repoUrl || ''
    });
    setSelectedFile(null); // Reset file input
    setSuccessMessage('');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setSelectedFile(null);
    setProjectForm({
      title: '',
      description: '',
      tags: [],
      imageUrl: '',
      caseStudy: '',
      repoUrl: ''
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSaveProject = async () => {
    if (!projectForm.title) {
      alert("Title is required");
      return;
    }

    setIsGenerating(true);
    setLoadingMessage('Saving project...');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let finalImageUrl = projectForm.imageUrl;

      // 1. Try Upload Image if a new file is selected
      if (selectedFile) {
        try {
          setLoadingMessage('Uploading image...');
          const uploadedUrl = await uploadImage(selectedFile);
          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.warn("Supabase Storage upload failed. Falling back to Base64 string.", uploadErr);
          if (projectForm.imageUrl && projectForm.imageUrl.startsWith('data:')) {
            finalImageUrl = projectForm.imageUrl;
          } else {
            setErrorMessage("Failed to upload image. Saving with local preview.");
          }
        }
      }

      const supabaseData = {
        title: projectForm.title,
        description: projectForm.description,
        tags: projectForm.tags,
        image_url: finalImageUrl,
        repo_url: projectForm.repoUrl,
        case_study: projectForm.caseStudy,
        updated_at: new Date().toISOString()
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(supabaseData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([{ id: crypto.randomUUID(), ...supabaseData, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }

      setSuccessMessage("Project saved to Supabase!");
      resetForm();
      await fetchProjects();

    } catch (err: any) {
      console.error("Critical Save Error", err);
      setErrorMessage(`Failed to save project: ${err.message}`);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image is too large. Please use an image under 5MB.");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiEnhance = async () => {
    if (!projectForm.description) return;
    setIsGenerating(true);
    setLoadingMessage('Enhancing description with Gemini...');
    try {
      const enhanced = await generateContent({
        type: 'project',
        prompt: `Title: ${projectForm.title}. Raw notes: ${projectForm.description}`
      });
      setProjectForm({ ...projectForm, caseStudy: enhanced as string });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchGithubData = async () => {
    if (!projectForm.repoUrl) {
      alert("Please enter a valid GitHub repository URL first");
      return;
    }

    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = projectForm.repoUrl.match(regex);

    if (!match) {
      alert("Invalid GitHub URL format.");
      return;
    }

    const owner = match[1];
    const repo = match[2];

    setIsGenerating(true);
    setLoadingMessage('Fetching repository data from GitHub...');

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!response.ok) throw new Error("Failed to fetch repo data");

      const data = await response.json();

      setProjectForm(prev => ({
        ...prev,
        title: data.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: data.description || prev.description,
        tags: data.topics && data.topics.length > 0 ? data.topics : prev.tags,
        imageUrl: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
        repoUrl: data.html_url
      }));
      setSelectedFile(null);

    } catch (error) {
      console.error(error);
      alert("Could not fetch data from GitHub.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (authStatus === AuthStatus.LOGGED_OUT) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lumina-bg">
        <form onSubmit={handleLogin} className="bg-lumina-card border border-white/10 p-8 rounded-2xl w-96">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">Admin Access</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-black/50 border border-white/20 rounded p-3 mb-4 text-white focus:border-lumina-accent outline-none transition-colors"
          />
          <button type="submit" className="w-full bg-lumina-accent text-lumina-bg font-bold py-3 rounded hover:bg-white transition-colors clickable">
            ENTER DASHBOARD
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">Hint: admin</p>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-display font-bold">Dashboard</h1>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-400">Manage your portfolio content</div>
          <div className="text-[10px] flex items-center gap-1 mt-1 text-lumina-accent">
            <Database size={10} /> Connected to Supabase
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-lumina-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lumina-accent font-mono animate-pulse">{loadingMessage}</p>
        </div>
      )}

      {/* Notifications */}
      {successMessage && (
        <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle size={20} />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertTriangle size={20} />
          {errorMessage}
        </div>
      )}

      {/* Project Editor Form */}
      <div className="bg-lumina-card/50 border border-white/10 rounded-2xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-lumina-accent"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {editingId ? <Pencil className="text-lumina-accent w-5 h-5" /> : <Plus className="text-lumina-accent w-5 h-5" />}
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 clickable">
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        {/* GitHub Import Section */}
        <div className="mb-6 bg-black/30 p-4 rounded-lg border border-white/5">
          <label className="text-xs text-lumina-accent mb-2 block uppercase tracking-wider font-bold flex items-center gap-2">
            <Github size={14} /> Import from GitHub
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://github.com/username/repository"
              value={projectForm.repoUrl}
              onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
              className="flex-1 bg-black/30 border border-white/20 rounded p-3 text-white focus:border-lumina-accent outline-none transition-all clickable text-sm"
            />
            <button
              onClick={fetchGithubData}
              className="bg-white/10 hover:bg-lumina-accent hover:text-black text-white px-4 rounded transition-colors flex items-center gap-2 clickable text-sm font-bold border border-white/10"
              title="Auto-fill title, description, tags and image from GitHub"
            >
              <Download size={16} /> Fetch Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Title</label>
            <input
              type="text"
              placeholder="e.g. n8n Enterprise Automation"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:border-lumina-accent outline-none transition-all clickable"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Tags</label>
            <input
              type="text"
              placeholder="n8n, Python, Make (comma separated)"
              value={projectForm.tags?.join(', ')}
              onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value.split(',').map(t => t.trim()) })}
              className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:border-lumina-accent outline-none transition-all clickable"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Short Description</label>
          <textarea
            placeholder="Brief overview of the project..."
            value={projectForm.description}
            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:border-lumina-accent outline-none h-24 transition-all clickable"
          />
        </div>

        {/* Improved Image Upload Section */}
        <div className="mb-6">
          <label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Project Cover Image</label>

          {!projectForm.imageUrl ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-black/20 hover:bg-white/5 hover:border-lumina-accent/50 transition-all group clickable">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400 group-hover:text-lumina-accent transition-colors" />
                <p className="text-sm text-gray-400 group-hover:text-white transition-colors">Click to upload image</p>
                <p className="text-xs text-gray-600 mt-1">Uploads to Supabase Storage</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          ) : (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/20 group">
              <img src={projectForm.imageUrl} alt="Project Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <label className="cursor-pointer bg-white text-black px-4 py-2 rounded font-bold hover:bg-lumina-accent transition-colors flex items-center gap-2 clickable">
                  <Upload size={16} /> Change
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <button
                  onClick={() => {
                    setProjectForm({ ...projectForm, imageUrl: '' });
                    setSelectedFile(null);
                  }}
                  className="bg-red-500/80 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors flex items-center gap-2 clickable"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded pointer-events-none">
                <ImageIcon size={10} className="inline mr-1" /> Cover Image
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <button
            onClick={handleAiEnhance}
            className="text-xs flex items-center gap-2 text-lumina-accent hover:text-white transition-colors clickable"
            title="Generate a full case study from description"
          >
            <Wand2 className="w-4 h-4" /> Generate Case Study with Gemini
          </button>
          <button
            onClick={handleSaveProject}
            className="bg-white text-black hover:bg-lumina-accent px-8 py-3 rounded font-bold transition-colors flex items-center gap-2 clickable shadow-lg hover:shadow-lumina-accent/20"
          >
            <Save className="w-4 h-4" /> {editingId ? 'Update Project' : 'Save Project'}
          </button>
        </div>

        {projectForm.caseStudy && (
          <div className="mt-6 p-4 bg-black/40 rounded border border-white/10 text-sm text-gray-300 animate-in fade-in slide-in-from-top-2">
            <span className="text-xs uppercase text-lumina-accent mb-2 block font-bold">Generated Case Study</span>
            {projectForm.caseStudy}
          </div>
        )}
      </div>

      {/* Project List */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-bold text-gray-400 uppercase tracking-widest mb-4">Existing Projects</h3>
        {projects.length === 0 && (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-lg text-gray-500">
            No projects yet. Add one above.
          </div>
        )}
        {projects.map(project => (
          <div key={project.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl group hover:bg-white/10 transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 relative">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500">
                    <ImageIcon size={16} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-lumina-accent transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="p-3 bg-black/50 hover:bg-lumina-accent hover:text-black rounded-full transition-all clickable border border-white/10"
                title="Edit"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-3 bg-black/50 hover:bg-red-500 hover:text-white rounded-full transition-all clickable border border-white/10"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};