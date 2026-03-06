import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date";
import DeleteContactButton from "@/components/admin/delete-contact-button";

interface Contact {
  id: string;
  email: string;
  full_name: string;
  company: string;
  role: string;
  source: string;
  source_detail: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface EbookDownload {
  id: string;
  contact_id: string;
  ebook_name: string;
  downloaded_at: string;
}

interface Communication {
  id: string;
  contact_id: string;
  email_subject: string;
  email_type: string;
  sent_at: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Contact Details",
  description: "View contact details",
};

export default async function ContactDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch contact
  const { data: contact, error: contactError } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (contactError || !contact) {
    return (
      <div>
        <Link
          href="/admin/crm"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-8 inline-block"
        >
          ← Back to Contacts
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-900">
          Contact not found
        </div>
      </div>
    );
  }

  // Fetch ebook downloads if table exists
  let ebookDownloads: EbookDownload[] = [];
  try {
    const { data: downloads } = await supabase
      .from("ebook_downloads")
      .select("*")
      .eq("contact_id", id)
      .order("downloaded_at", { ascending: false });

    if (downloads) {
      ebookDownloads = downloads;
    }
  } catch (error) {
    // Table might not exist, continue
  }

  // Fetch communications if table exists
  let communications: Communication[] = [];
  try {
    const { data: comms } = await supabase
      .from("communications")
      .select("*")
      .eq("contact_id", id)
      .order("sent_at", { ascending: false });

    if (comms) {
      communications = comms;
    }
  } catch (error) {
    // Table might not exist, continue
  }

  return (
    <div>
      <Link
        href="/admin/crm"
        className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-8 inline-block"
      >
        ← Back to Contacts
      </Link>

      {/* Contact Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {contact.full_name}
            </h1>
            <p className="text-gray-600 mt-1">{contact.email}</p>
          </div>
          <DeleteContactButton contactId={contact.id} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Company
            </label>
            <p className="text-gray-900 mt-1 text-lg">
              {contact.company || "—"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Role
            </label>
            <p className="text-gray-900 mt-1 text-lg">{contact.role || "—"}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Source
            </label>
            <p className="text-gray-900 mt-1 text-lg">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
                {contact.source}
              </span>
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Source Detail
            </label>
            <p className="text-gray-900 mt-1 text-lg">
              {contact.source_detail || "—"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Tags
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.tags && contact.tags.length > 0 ? (
                contact.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">No tags</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Created At
            </label>
            <p className="text-gray-900 mt-1 text-lg">
              {formatDate(contact.created_at)}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Updated At
            </label>
            <p className="text-gray-900 mt-1 text-lg">
              {formatDate(contact.updated_at)}
            </p>
          </div>
        </div>
      </div>

      {/* Ebook Downloads Section */}
      {ebookDownloads.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Ebook Downloads
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Ebook
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Downloaded
                  </th>
                </tr>
              </thead>
              <tbody>
                {ebookDownloads.map((download) => (
                  <tr key={download.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-900">
                      {download.ebook_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(download.downloaded_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Communications Section */}
      {communications.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Communications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Subject
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Sent
                  </th>
                </tr>
              </thead>
              <tbody>
                {communications.map((comm) => (
                  <tr key={comm.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-900">
                      {comm.email_subject}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-900 rounded text-xs font-medium">
                        {comm.email_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(comm.sent_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
