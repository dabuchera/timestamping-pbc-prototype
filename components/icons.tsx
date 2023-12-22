import {
    AlarmClockCheck, AlertTriangle, ArrowRight, Calculator, Check, ChevronLeft, ChevronRight,
    Command, CreditCard, Database, File, FileCog, FileText, HelpCircle, Hourglass, Image, Info,
    Laptop, LayoutTemplate, Loader, Loader2, Moon, MoreVertical, Pizza, Plus, Settings, SunMedium,
    Timer, TimerOff, Trash, Twitter, User, X, XOctagon
} from 'lucide-react';

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  loader: Loader,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  billing: CreditCard,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  twitter: Twitter,
  check: Check,
  timestamping: AlarmClockCheck,
  // Contract Operations
  ellipsis: MoreVertical,
  disabled: XOctagon,
  // Dashboard Nav
  templates: LayoutTemplate,
  datasets: Database,
  contracts: FileCog,
  results: Calculator,
  settings: Settings,
  // Timestamping info
  timestamped: Timer,
  nottimestamped: TimerOff,
  info: Info,
}
