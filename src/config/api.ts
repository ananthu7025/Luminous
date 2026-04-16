/**
 * API Configuration for Luminous CRM
 * Connects the public website to the CRM backend
 */

export const CRM_API_BASE = process.env.NEXT_PUBLIC_CRM_API_BASE || 'https://luminoustracker.luminouslogics.com';

export const crmApi = {
  blog: {
    list: (limit?: number) => `${CRM_API_BASE}/api/blog${limit ? `?limit=${limit}` : ''}`,
    detail: (slug: string) => `${CRM_API_BASE}/api/blog?slug=${slug}`,
  },
  testimonials: {
    list: () => `${CRM_API_BASE}/api/testimonials`,
  },
  caseStudies: {
    list: (limit?: number) => `${CRM_API_BASE}/api/case-studies${limit ? `?limit=${limit}` : ''}`,
    detail: (slug: string) => `${CRM_API_BASE}/api/case-studies?slug=${slug}`,
  },
  chatbot: {
    config: () => `${CRM_API_BASE}/api/chatbot-config`,
    message: () => `${CRM_API_BASE}/api/chatbot/message`,
  },
};

/**
 * Fetch helper with error handling
 */
export async function fetchFromCRM<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`CRM API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from CRM: ${error}`);
    return null;
  }
}
