/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveSection = 'home' | 'philosophy' | 'solutions';

export interface Project {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
}

export interface Product {
  name: string;
  symbol: string;
  description: string;
}

export interface PhilosophyFrame {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  metrics: {
    label: string;
    value: string;
  };
}

export interface Solution {
  id: string;
  frameId: number;
  title: string;
  summary: string;
  description: string;
  techSpecs: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'escalated';
}
