import {
  MapPin,
  Mail,
  Github,
  Briefcase,
  GraduationCap,
  Rocket,
  ExternalLink,
  Star,
  Code2,
  Database,
  Server,
  Wrench,
  BookOpen,
  ChevronRight,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import type { SkillCategory } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Mail,
  BookOpen,
  Linkedin,
  Twitter,
};

const skillCategoryMeta: Record<SkillCategory, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  frontend: { label: '前端开发', icon: Code2, color: '#6366f1' },
  backend: { label: '后端开发', icon: Server, color: '#22d3ee' },
  devops: { label: 'DevOps', icon: Database, color: '#f59e0b' },
  other: { label: '其他技能', icon: Wrench, color: '#a855f7' },
};

export default function AboutPage() {
  const { profile } = useBlogStore();

  const skillsByCategory = profile.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof profile.skills>);

  const totalXP = Math.round(profile.skills.reduce((s, x) => s + x.level, 0) / profile.skills.length);

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Hero / Profile Header */}
      <section className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-accent-primary/20 via-accent-tertiary/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-accent-secondary/15 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-accent-primary via-accent-tertiary to-accent-secondary rounded-3xl blur-md opacity-60 animate-pulse-slow" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-accent-primary/40 bg-bg-tertiary">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 -right-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-xs font-bold text-white shadow-glow flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-white/30" />
              {totalXP}% 熟练度
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="chip bg-accent-success/15 border border-accent-success/40 text-accent-success">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-success" />
                </span>
                正在寻找新机会
              </span>
              <span className="chip bg-bg-tertiary border border-border text-text-secondary">
                <Briefcase className="w-3 h-3" />
                {profile.experiences.length}+ 年经验
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary font-light mb-4">{profile.title}</p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mb-6">{profile.bio}</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-text-tertiary mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent-tertiary" />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-accent-secondary transition-colors">
                <Mail className="w-4 h-4 text-accent-primary" />
                {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer noopener" className="flex items-center gap-1.5 hover:text-accent-secondary transition-colors">
                <Github className="w-4 h-4 text-accent-secondary" />
                GitHub 主页
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {profile.social.map((s) => {
                const Icon = iconMap[s.icon] || ExternalLink;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group w-11 h-11 rounded-xl bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-secondary hover:border-accent-primary/40 hover:shadow-glow/20 hover:-translate-y-0.5 transition-all duration-300"
                    title={s.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="section-title">
          技能栈
          <span className="ml-3 text-sm font-normal text-text-tertiary">
            多年实战积累的技术能力
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.keys(skillCategoryMeta) as SkillCategory[]).map((cat) => {
            const meta = skillCategoryMeta[cat];
            const skills = skillsByCategory[cat] || [];
            const Icon = meta.icon;
            if (skills.length === 0) return null;
            return (
              <div key={cat} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: `${meta.color}25`, color: meta.color, boxShadow: `0 0 20px ${meta.color}20` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold">{meta.label}</h3>
                    <p className="text-xs text-text-tertiary">{skills.length} 项技能</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                        <span className="text-xs font-mono text-text-tertiary">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-bg-tertiary overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)`,
                            boxShadow: `0 0 10px ${meta.color}50`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Work Experience */}
      <section>
        <h2 className="section-title">
          工作经历
          <span className="ml-3 text-sm font-normal text-text-tertiary">
            丰富的一线大厂实战经验
          </span>
        </h2>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-tertiary to-accent-secondary" />

          <div className="space-y-8">
            {profile.experiences.map((exp, idx) => (
              <div key={exp.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-8 md:-left-12 top-6 w-6 h-6 md:w-8 md:h-8 rounded-full bg-bg-secondary border-2 border-accent-primary flex items-center justify-center shadow-glow">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary animate-pulse" />
                </div>
                <div className="absolute -left-8 md:-left-12 top-6 w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-primary/20 blur-lg" />

                <div className="glass-card glass-card-hover p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display font-bold text-xl text-text-primary">{exp.position}</h3>
                        <span className="chip bg-accent-primary/15 border border-accent-primary/40 text-accent-secondary text-xs">
                          <Briefcase className="w-3 h-3" />
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <GraduationCap className="w-4 h-4 text-accent-tertiary" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <span className="chip bg-bg-tertiary border border-border text-text-tertiary font-mono text-xs">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-5">{exp.description}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border-subtle">
                    <span className="text-xs text-text-tertiary mr-1">技术栈：</span>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="chip-outline !text-[11px] !py-0.5 !px-2 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="section-title">
          个人项目
          <span className="ml-3 text-sm font-normal text-text-tertiary">
            业余时间打造的作品
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((project, idx) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover p-6 md:p-7 group relative overflow-hidden"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-primary/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:from-accent-primary/20 transition-all" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30 flex items-center justify-center text-accent-secondary group-hover:shadow-glow/30 transition-all">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-8 h-8 rounded-lg bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-secondary hover:border-accent-primary/40 transition-all"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-8 h-8 rounded-lg bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-secondary hover:border-accent-primary/40 transition-all"
                        aria-label="Visit"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-5 min-h-[60px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-border-subtle">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip-outline !text-[10px] !py-0.5 !px-2 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs text-text-tertiary flex items-center gap-1 group-hover:text-accent-secondary transition-colors">
                  查看详情
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
