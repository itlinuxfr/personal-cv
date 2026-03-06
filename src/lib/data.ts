export const PROFILE = {
  name: "Benjamin Martineau",
  titles: [
    "Tech Lead OpenShift/Kubernetes",
    "Platform & SRE Engineer",
    "OpenShift Specialist",
    "Infrastructure Automator",
    "Open Source Enthusiast",
  ],
  description:
    "Grand passionné d'informatique, j'ai développé mes compétences au fil de mes expériences et formations. Autodidacte dans l'âme, spécialisé dans les environnements Linux, OpenShift/Kubernetes et tout ce qui touche à l'Open Source.",
  location: "Niort, Nouvelle-Aquitaine, France",
  email: "martineau.benjamin96@gmail.com",
  linkedin: "https://www.linkedin.com/in/benjamin-m-90b698150",
  github: "https://github.com/itlinuxfr",
};

export const STATS = [
  { value: "7",    label: "Années d'expérience" },
  { value: "35+",  label: "Clusters gérés" },
  { value: "99.9%",label: "Uptime moyen" },
  { value: "54053",label: "Cafés consommés" },
];

export const EXPERIENCES = [
  {
    date: "Janv. 2026 — Aujourd'hui",
    company: "Groupe Covéa",
    role: "Tech Lead OpenShift/Kubernetes",
    description:
      "Mise en oeuvre des architectures Kubernetes du groupe Covéa avec la solution Red Hat OpenShift et toute la suite.",
    tags: [
      { label: "OpenShift",     style: "tp" },
      { label: "Kubernetes",    style: "tc" },
      { label: "ArgoCD",        style: "tg" },
      { label: "GitOps",        style: "tc" },
      { label: "HostedControlPlane", style: "" },
      { label: "ACM",           style: "" },
    ],
    dotColor: "var(--color-primary)",
  },
  {
    date: "Juil. 2024 — Aujourd'hui",
    company: "Groupe Covéa",
    role: "Ingénieur DevOps",
    description:
      "Ingénierie Système, infrastructure IaaS & PaaS et culture DevOps sur site.",
    tags: [
      { label: "OpenShift",     style: "tp" },
      { label: "Kubernetes",    style: "tc" },
      { label: "Ansible",       style: "tg" },
      { label: "Helm",          style: "tc" },
      { label: "RHEL",          style: "" },
      { label: "Vault",         style: "" },
      { label: "GitLab",        style: "tg" },
      { label: "ELK",           style: "" },
    ],
    dotColor: "var(--color-secondary)",
  },
  {
    date: "Août 2020 — Juil. 2024",
    company: "Groupe Covéa",
    role: "Chargé d'ingénierie & Service SI",
    description:
      "Gestion et évolution des infrastructures d'ingénierie et services SI. Administration poussée sur une large stack d'outils d'infrastructure.",
    tags: [
      { label: "OpenShift",     style: "tp" },
      { label: "Ansible",       style: "tg" },
      { label: "RHEL",          style: "" },
      { label: "Vault",         style: "" },
      { label: "Proxmox",       style: "tc" },
      { label: "VMware",        style: "tc" },
      { label: "ManageIQ",      style: "" },
      { label: "Packer",        style: "tg" },
    ],
    dotColor: "var(--color-accent)",
  },
  {
    date: "Oct. 2019 — Août 2020",
    company: "Capgemini (Client: MAAF)",
    role: "Administrateur Système Unix/Linux",
    description:
      "Administration des serveurs Linux & Unix côté Production. Déploiement via Ansible, supervision Zabbix, et exploitation des outils Red Hat (Satellite, IDM, OpenShift). Gestion du stockage et des hyperviseurs.",
    tags: [
      { label: "RHEL/CentOS",   style: "" },
      { label: "Ansible",       style: "tg" },
      { label: "OpenShift",     style: "tp" },
      { label: "Satellite 6",   style: "" },
      { label: "VMware/oVirt",  style: "tc" },
      { label: "PureStorage",   style: "" },
    ],
    dotColor: "var(--color-dim)",
  },
  {
    date: "Févr. 2019 — Oct. 2019",
    company: "Experis France (Client: MAAF)",
    role: "Administrateur Système Unix/Linux",
    description:
      "Administration des serveurs de production. Automatisation des provisionings de VM, déploiements d'applicatifs Linux, et gestion du parc via Red Hat Satellite et IDM.",
    tags: [
      { label: "Linux",         style: "" },
      { label: "Ansible",       style: "tg" },
      { label: "Zabbix",        style: "" },
      { label: "Satellite",     style: "" },
    ],
    dotColor: "var(--color-dim)",
  },
  {
    date: "Déc. 2017 — Janv. 2019",
    company: "MAAF via prestataire",
    role: "Administrateur ELK",
    description:
      "Conception, gestion et administration des clusters ELK (Elasticsearch, Logstash, Kibana). Industrialisation via Ansible et mise en place des injecteurs de logs.",
    tags: [
      { label: "ELK Stack",     style: "tp" },
      { label: "Kafka",         style: "tc" },
      { label: "Ansible",       style: "tg" },
      { label: "Bash/Shell",    style: "" },
    ],
    dotColor: "var(--color-dim)",
  },
];

export const SKILLS = [
  {
    category: "// orchestration & containers",
    items: ["Kubernetes", "OpenShift", "Docker", "Podman", "Helm", "ArgoCD", "Talos Linux"],
  },
  {
    category: "// infrastructure as code",
    items: ["Ansible", "Terraform", "GitOps", "Packer", "GitLab CI"],
  },
  {
    category: "// ops & observability",
    items: ["Prometheus", "Grafana", "ELK Stack", "Zabbix"],
  },
  {
    category: "// security & storage",
    items: ["Vault", "Ceph", "PureStorage", "NetApp"],
  },
  {
    category: "// scripting & dev",
    items: ["Bash / Shell", "YAML", "HCL"],
  },
];

export const TECHS = [
  { name: "kubernetes",  slug: "kubernetes" },
  { name: "openshift",   slug: "redhatopenshift" },
  { name: "argocd",      slug: "argo" },
  { name: "docker",      slug: "docker" },
  { name: "ansible",     slug: "ansible" },
  { name: "terraform",   slug: "terraform" },
  { name: "helm",        slug: "helm" },
  { name: "prometheus",  slug: "prometheus" },
  { name: "grafana",     slug: "grafana" },
  { name: "vault",       slug: "vault" },
  { name: "git",         slug: "git" },
  { name: "linux",       slug: "linux" },
  { name: "etcd",        slug: "etcd" },
  { name: "cilium",      slug: "cilium" },
  { name: "ceph",        slug: "ceph" },
  { name: "podman",      slug: "podman" },
  { name: "sideroslabs", slug: "sideroslabs" },
];

/* ─── ArgoCD-style career tree ─── */
export type TreeNodeStatus = "synced" | "progressing" | "healthy";

export interface CareerNode {
  id: string;
  label: string;
  subtitle?: string;
  date?: string;
  status: TreeNodeStatus;
  icon: string;
  tags?: string[];
}

export interface CareerEdge {
  from: string;
  to: string;
}

export const CAREER_NODES: CareerNode[] = [
  { id: "root",           label: "Ma Carrière",            status: "healthy",     icon: "🚀" },
  { id: "bts",            label: "Obtention BTS SIO",      status: "synced",      icon: "🎓", date: "2017" },
  { id: "proservia",      label: "Proservia",              status: "synced",      icon: "🏢", date: "2017–2019" },
  { id: "middleware",      label: "Mission Middleware",     status: "synced",      icon: "⚙️", tags: ["Linux", "Middleware", "Tomcat"] },
  { id: "capgemini",       label: "Capgemini",             status: "synced",      icon: "🏢", date: "2019–2020" },
  { id: "sysadmin1",       label: "Mission SysAdmin",      status: "synced",      icon: "🖥️", tags: ["RHEL", "Nagios", "Puppet"] },
  { id: "covea",           label: "Covéa",                 status: "synced",      icon: "🏦", date: "2020–now" },
  { id: "sysadmin2",       label: "Mission SysAdmin",      status: "synced",      icon: "🖥️", date: "2023", tags: ["Ansible", "Terraform", "VMware"] },
  { id: "openshift",       label: "OpenShift Ops",         status: "synced",      icon: "☸️", date: "2024", tags: ["OpenShift", "ArgoCD", "Helm"] },
  { id: "techlead",        label: "Tech Lead OpenShift",   status: "progressing", icon: "👑", date: "2025", tags: ["OpenShift", "GitOps", "SRE", "Platform"] },
];

export const CAREER_EDGES: CareerEdge[] = [
  { from: "root",       to: "bts" },
  { from: "bts",        to: "proservia" },
  { from: "proservia",  to: "middleware" },
  { from: "middleware",  to: "capgemini" },
  { from: "capgemini",   to: "sysadmin1" },
  { from: "sysadmin1",   to: "covea" },
  { from: "covea",       to: "sysadmin2" },
  { from: "sysadmin2",   to: "openshift" },
  { from: "openshift",   to: "techlead" },
];
