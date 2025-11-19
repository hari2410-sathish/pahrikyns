export const courses = {
  devops: {
    id: "devops",
    title: "DevOps Mastery",
    description: "...",
    tools: {
      git: {
        id: "git",
        name: "Git",
        title: "Git",
        logo: "/logos/git.png",
        description: "Version control system",
      },
      github: {
        id: "github",
        name: "GitHub",
        title: "GitHub",
        logo: "/logos/github.png",
        description: "Remote repo hosting",
      },
      jenkins: {
        id: "jenkins",
        name: "Jenkins",
        title: "Jenkins",
        logo: "/logos/jenkins.png",
        description: "CI/CD automation",
      },
      docker: {
        id: "docker",
        name: "Docker",
        title: "Docker",
        logo: "/logos/docker.png",
        description: "Containers",
      },
      // add remaining tools…
    }
  },

  // AWS category (same format)
  aws: {
    id: "aws",
    title: "AWS Mastery",
    description: "...",
    tools: {
      ec2: {
        id: "ec2",
        name: "EC2",
        title: "EC2",
        logo: "/logos/ec2.png",
        description: "Compute service",
      },
      // etc…
    }
  },

  // Frontend category (same format)
  frontend: {
    id: "frontend",
    title: "Frontend Development",
    description: "...",
    tools: {
      html: { id:"html", name:"HTML", title:"HTML", logo:"/logos/html.png", description:"Markup language" },
      css: { id:"css", name:"CSS", title:"CSS", logo:"/logos/css.png", description:"Styling" },
      javascript: { id:"javascript", name:"JS", title:"JavaScript", logo:"/logos/js.png", description:"Programming language" },
      react: { id:"react", name:"React", title:"React", logo:"/logos/react.png", description:"UI Framework" },
      tailwind: { id:"tailwind", name:"Tailwind", title:"Tailwind CSS", logo:"/logos/tailwind.png", description:"CSS framework" },
    }
  }
};
