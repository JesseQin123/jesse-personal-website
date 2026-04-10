export interface TutorialChapter {
  id: string;
  title: string;
  titleCn: string;
  path: string;
}

export interface TutorialSection {
  title: string;
  titleCn: string;
  chapters: TutorialChapter[];
}

export interface Tutorial {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  icon: string;
  tags: string[];
  sourceUrl: string;
  sections: TutorialSection[];
}

export const openclawTutorial: Tutorial = {
  id: "openclaw",
  title: "Awesome OpenClaw Tutorial",
  titleCn: "OpenClaw 超级个体实战指南",
  description:
    "The most comprehensive Chinese tutorial for OpenClaw — from zero to AI work assistant, covering installation, configuration, real-world cases, and troubleshooting.",
  descriptionCn:
    "从零开始打造你的 AI 工作助手——最全面的中文教程，涵盖安装、配置、实战案例和避坑指南",
  icon: "🦞",
  tags: ["AI", "OpenClaw", "Automation", "中文"],
  sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial",
  sections: [
    {
      title: "Getting Started",
      titleCn: "零基础入门",
      chapters: [
        {
          id: "01-introduction",
          title: "Introduction to OpenClaw",
          titleCn: "第1章：认识OpenClaw",
          path: "docs/01-basics/01-introduction.md",
        },
        {
          id: "02-installation",
          title: "Installation & Deployment",
          titleCn: "第2章：快速部署",
          path: "docs/01-basics/02-installation.md",
        },
        {
          id: "03-quick-start",
          title: "Quick Start",
          titleCn: "第3章：快速上手",
          path: "docs/01-basics/03-quick-start.md",
        },
      ],
    },
    {
      title: "Core Features",
      titleCn: "核心功能",
      chapters: [
        {
          id: "04-file-management",
          title: "File Management",
          titleCn: "第4章：文件管理",
          path: "docs/02-core-features/04-file-management.md",
        },
        {
          id: "05-knowledge-management",
          title: "Knowledge Management",
          titleCn: "第5章：知识管理",
          path: "docs/02-core-features/05-knowledge-management.md",
        },
        {
          id: "06-schedule-management",
          title: "Schedule Management",
          titleCn: "第6章：日程管理",
          path: "docs/02-core-features/06-schedule-management.md",
        },
        {
          id: "07-automation-workflow",
          title: "Automation Workflow",
          titleCn: "第7章：自动化工作流",
          path: "docs/02-core-features/07-automation-workflow.md",
        },
      ],
    },
    {
      title: "Advanced",
      titleCn: "进阶应用",
      chapters: [
        {
          id: "08-skills-extension",
          title: "Skills Extension",
          titleCn: "第8章：Skills扩展",
          path: "docs/03-advanced/08-skills-extension.md",
        },
        {
          id: "09-multi-platform",
          title: "Multi-Platform Integration",
          titleCn: "第9章：多平台集成",
          path: "docs/03-advanced/09-multi-platform-integration.md",
        },
        {
          id: "10-api-integration",
          title: "API Integration",
          titleCn: "第10章：API集成开发",
          path: "docs/03-advanced/10-api-integration.md",
        },
        {
          id: "11-advanced-config",
          title: "Advanced Configuration",
          titleCn: "第11章：高级配置",
          path: "docs/03-advanced/11-advanced-configuration.md",
        },
      ],
    },
    {
      title: "Practical Cases",
      titleCn: "实战案例",
      chapters: [
        {
          id: "12-personal-productivity",
          title: "Personal Productivity",
          titleCn: "第12章：个人生产力",
          path: "docs/04-practical-cases/12-personal-productivity.md",
        },
        {
          id: "13-advanced-automation",
          title: "Advanced Automation",
          titleCn: "第13章：高级自动化",
          path: "docs/04-practical-cases/13-advanced-automation.md",
        },
        {
          id: "14-creative-applications",
          title: "Creative Applications",
          titleCn: "第14章：创意应用",
          path: "docs/04-practical-cases/14-creative-applications.md",
        },
        {
          id: "15-solo-entrepreneur",
          title: "Solo Entrepreneur Cases",
          titleCn: "第15章：超级个体案例",
          path: "docs/04-practical-cases/15-solo-entrepreneur-cases.md",
        },
      ],
    },
    {
      title: "Appendix",
      titleCn: "附录",
      chapters: [
        {
          id: "A-command-reference",
          title: "Command Reference",
          titleCn: "附录A：命令速查",
          path: "appendix/A-command-reference.md",
        },
        {
          id: "B-skills-catalog",
          title: "Skills Catalog",
          titleCn: "附录B：Skills目录",
          path: "appendix/B-skills-catalog.md",
        },
        {
          id: "C-api-comparison",
          title: "API Comparison",
          titleCn: "附录C：API对比",
          path: "appendix/C-api-comparison.md",
        },
        {
          id: "D-community-resources",
          title: "Community Resources",
          titleCn: "附录D：社区资源",
          path: "appendix/D-community-resources.md",
        },
        {
          id: "E-common-problems",
          title: "Common Problems",
          titleCn: "附录E：常见问题",
          path: "appendix/E-common-problems.md",
        },
        {
          id: "F-best-practices",
          title: "Best Practices",
          titleCn: "附录F：最佳实践",
          path: "appendix/F-best-practices.md",
        },
        {
          id: "H-config-templates",
          title: "Config Templates",
          titleCn: "附录H：配置模板",
          path: "appendix/H-config-templates.md",
        },
        {
          id: "N-skills-ecosystem",
          title: "Skills Ecosystem",
          titleCn: "附录N：Skills生态",
          path: "appendix/N-skills-ecosystem.md",
        },
      ],
    },
  ],
};

export const tutorials: Tutorial[] = [openclawTutorial];
