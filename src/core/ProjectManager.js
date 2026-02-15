import fs from 'fs';
import path from 'path';

class ProjectManager {
    constructor(basePath) {
        this.basePath = basePath;
        this.projectsFile = path.join(basePath, '.actm_projects.json');
        this.projects = this.loadProjects();
    }

    loadProjects() {
        if (fs.existsSync(this.projectsFile)) {
            return JSON.parse(fs.readFileSync(this.projectsFile, 'utf-8'));
        }
        return {};
    }

    saveProjects() {
        fs.writeFileSync(this.projectsFile, JSON.stringify(this.projects, null, 2), 'utf-8');
    }

    addProject(name, path) {
        this.projects[name] = { path, created: new Date().toISOString() };
        this.saveProjects();
        console.log(`✅ Project ${name} added.`);
    }

    listProjects() {
        console.log('📂 Projects:');
        for (const [name, info] of Object.entries(this.projects)) {
            console.log(`- ${name} -> ${info.path}`);
        }
    }
}

export default ProjectManager;
