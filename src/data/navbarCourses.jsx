// src/data/navbarCourses.js

// ===== ICON IMPORTS =====
import CloudIcon from "@mui/icons-material/Cloud";
import BuildIcon from "@mui/icons-material/Build";
import AnchorIcon from "@mui/icons-material/Anchor";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SettingsIcon from "@mui/icons-material/Settings";
import DnsIcon from "@mui/icons-material/Dns";
import TerminalIcon from "@mui/icons-material/Terminal";
import DesktopMacIcon from "@mui/icons-material/DesktopMac"; // Linux replacement
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MemoryIcon from "@mui/icons-material/Memory";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import HubIcon from "@mui/icons-material/Hub";
import LanIcon from "@mui/icons-material/Lan";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import InsightsIcon from "@mui/icons-material/Insights";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QueueIcon from "@mui/icons-material/Queue";

export const navbarCourses = [
  // ================= DEVOPS CATEGORY ==================
  {
    name: "DevOps",
    icon: <BuildIcon />,
    path: "/courses/devops",
    tools: [
      { name: "Git", path: "/courses/devops/git", icon: <GitHubIcon /> },
      { name: "Jenkins", path: "/courses/devops/jenkins", icon: <BuildIcon /> },
      { name: "Docker", path: "/courses/devops/docker", icon: <AnchorIcon /> },
      { name: "Kubernetes", path: "/courses/devops/kubernetes", icon: <SportsKabaddiIcon /> },
      { name: "Terraform", path: "/courses/devops/terraform", icon: <AutoGraphIcon /> },
      { name: "Ansible", path: "/courses/devops/ansible", icon: <SettingsIcon /> },
      { name: "Prometheus", path: "/courses/devops/prometheus", icon: <TravelExploreIcon /> },
      { name: "Splunk", path: "/courses/devops/splunk", icon: <InsightsIcon /> },
      { name: "Grafana", path: "/courses/devops/grafana", icon: <FlashOnIcon /> },
    ],
  },

  // ================= AWS CATEGORY ==================
  {
    name: "AWS",
    icon: <CloudIcon />,
    path: "/courses/aws",
    tools: [
      { name: "EC2", path: "/courses/aws/ec2", icon: <StorageIcon /> },
      { name: "S3", path: "/courses/aws/s3", icon: <HubIcon /> },
      { name: "IAM", path: "/courses/aws/iam", icon: <ManageAccountsIcon /> },
      { name: "Lambda", path: "/courses/aws/lambda", icon: <FlashOnIcon /> },
      { name: "SQS", path: "/courses/aws/sqs", icon: <QueueIcon /> },
      { name: "SNS", path: "/courses/aws/sns", icon: <TravelExploreIcon /> },
      { name: "CloudWatch", path: "/courses/aws/cloudwatch", icon: <VisibilityIcon /> },
      { name: "VPC", path: "/courses/aws/vpc", icon: <LanIcon /> },
      { name: "RDS", path: "/courses/aws/rds", icon: <StorageIcon /> },
      { name: "Auto Scaling", path: "/courses/aws/autoscaling", icon: <SwapVertIcon /> },
      { name: "Load Balancer", path: "/courses/aws/loadbalancer", icon: <DnsIcon /> },
      { name: "Route 53", path: "/courses/aws/route53", icon: <TravelExploreIcon /> },
    ],
  },

  // ================= OS CATEGORY ==================
  {
    name: "OS",
    icon: <TerminalIcon />,
    path: "/courses/os",
    tools: [
      { name: "Linux Basics", path: "/courses/os/linux", icon: <DesktopMacIcon /> },
      { name: "Ubuntu", path: "/courses/os/ubuntu", icon: <DesktopMacIcon /> },
      { name: "CentOS", path: "/courses/os/centos", icon: <DesktopMacIcon /> },
      { name: "Red Hat", path: "/courses/os/redhat", icon: <ManageAccountsIcon /> },
      { name: "Shell Commands", path: "/courses/os/commands", icon: <MemoryIcon /> },
    ],
  },
];
