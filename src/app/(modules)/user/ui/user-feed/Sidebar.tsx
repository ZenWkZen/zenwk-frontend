import React from "react";
import { BASE_TEXT_COLOR, ERROR_COLOR } from "@app/styles/constans-color";
import Link from "next/link";

interface SidebarProps {
    sections: {
        title: string;
        links: { label: string; href: string }[];
    }[];
    isError?: boolean;
}

const Sidebar = ({ sections, isError = false }: SidebarProps) => {
    return (
        <aside className="w-64 rounded-xl bg-white p-4 shadow-md">
            {sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                    <h2
                        className="mb-3 text-center text-sm font-semibold"
                        style={{
                            color: isError ? ERROR_COLOR : BASE_TEXT_COLOR,
                        }}
                    >
                        {section.title}
                    </h2>
                    <ul className="space-y-2">
                        {section.links.map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.href}
                                    className="block rounded-lg px-3 py-2 text-center text-xs text-gray-600 transition-colors hover:bg-gray-100"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;
