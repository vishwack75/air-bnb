export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export type IUser = User;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
