"use client";

export default function GithubRibbon({ url = "https://github.com/MuhammadWaqar7615" }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="cyber-github-ribbon"
      aria-label="View Muhammad Waqar's GitHub Profile"
    >
      Fork me on GitHub
    </a>
  );
}
