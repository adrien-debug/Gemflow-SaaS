/**
 * Configuration pour le mode DEV
 * Permet de bypasser l'authentification en local
 */

import { User } from "@entities/user/models/user.model";
import { AuthData } from "@entities/authorization/model/auth-data.model";

export const isDevMode = import.meta.env.VITE_DEV_MODE === "true";

/**
 * Mock user pour le mode DEV
 * Simule un utilisateur Super Admin connecté
 */
export const mockDevUser: User = {
  id: 1,
  firstName: "Dev",
  lastName: "User",
  fullName: "Dev User",
  email: "dev@localhost",
  isActive: true,
  role: {
    id: 1,
    code: "SUPER_ADMIN",
    name: "Super Admin",
  },
  photos: [],
};

/**
 * Mock auth data pour le mode DEV
 * Simule un token JWT valide
 */
export const mockDevAuthData: AuthData = {
  access_token: "dev-mock-token",
  refresh_token: "dev-mock-refresh-token",
  expires_in: 3600,
  refresh_expires_in: 7200,
  token_type: "Bearer",
};

/**
 * Mock dashboard stats pour le mode DEV
 * Simule des commandes réalistes de joaillerie
 */
import { DashboardStats } from "@entities/dashboard/models/dashboard-stats.model";

export const mockDevDashboardStats: DashboardStats = {
  totalOrders: 47,
  ordersInProgress: 18,
  ordersFinished: 14,
  ordersInvoiced: 9,
  ordersOverdue: 3,
  averageDelayDays: 2.4,
  ordersByStatus: [
    { status: "IN_CAD", statusLabel: "En CAO", count: 5 },
    { status: "PROTOTYPING", statusLabel: "Prototypage", count: 3 },
    { status: "AT_THE_CASTING", statusLabel: "En fonderie", count: 4 },
    { status: "RECEIVED_FROM_CASTING", statusLabel: "Reçu de fonderie", count: 2 },
    { status: "IN_MOUNTING", statusLabel: "En montage", count: 6 },
    { status: "MOUNTING_COMPLETED", statusLabel: "Montage terminé", count: 3 },
    { status: "IN_SETTING", statusLabel: "En sertissage", count: 4 },
    { status: "SETTING_COMPLETED", statusLabel: "Sertissage terminé", count: 2 },
    { status: "POLISHED", statusLabel: "Poli", count: 3 },
    { status: "QUALITY_CONTROL", statusLabel: "Contrôle qualité", count: 2 },
    { status: "QC_PASSED", statusLabel: "QC validé", count: 1 },
    { status: "READY_FOR_INVOICE", statusLabel: "Prêt à facturer", count: 3 },
    { status: "INVOICED", statusLabel: "Facturé", count: 5 },
    { status: "FINISHED", statusLabel: "Terminé", count: 4 },
  ],
  ordersByPriority: [
    { priority: "HIGH", count: 8 },
    { priority: "MEDIUM", count: 24 },
    { priority: "LOW", count: 15 },
  ],
  alerts: [
    {
      orderId: 1042,
      orderName: "Bague Solitaire Diamant 2.5ct — Mme Laurent",
      alertType: "OVERDUE",
      message: "Délai dépassé de 3 jours — sertissage en attente du diamant central",
      daysOverdue: 3,
    },
    {
      orderId: 1038,
      orderName: "Collier Rivière Émeraudes — Al Thani Collection",
      alertType: "OVERDUE",
      message: "Retard fonderie — pièce complexe nécessitant 2ème coulée",
      daysOverdue: 5,
    },
    {
      orderId: 1045,
      orderName: "Bracelet Jonc Or Rose 18K — Mme Dubois",
      alertType: "AT_RISK",
      message: "Livraison prévue dans 2 jours — polissage non démarré",
      daysOverdue: 0,
    },
    {
      orderId: 1031,
      orderName: "Parure Saphirs Ceylan — Maison Chaumet",
      alertType: "HIGH_PRIORITY",
      message: "Client VIP — commande haute joaillerie prioritaire",
      daysOverdue: 0,
    },
    {
      orderId: 1047,
      orderName: "Boucles Pendantes Diamants Poire — Mme Al Maktoum",
      alertType: "AT_RISK",
      message: "Pierres en transit depuis Anvers — ETA incertain",
      daysOverdue: 0,
    },
    {
      orderId: 1033,
      orderName: "Chevalière Armoiries Or Jaune — M. de Rothschild",
      alertType: "HIGH_PRIORITY",
      message: "Gravure personnalisée en attente de validation client",
      daysOverdue: 0,
    },
  ],
};
