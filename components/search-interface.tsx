"use client"

import { useState } from "react"
import { Search, Settings, Paperclip, Users, MessageCircle, List } from "lucide-react"

interface SearchResult {
  id: string
  type: "person" | "file" | "folder"
  name: string
  status?: "active" | "unactivated"
  lastSeen?: string
  location?: string
  fileCount?: number
  avatar?: string
}

const mockData: SearchResult[] = [
  {
    id: "1",
    type: "person",
    name: "Caroline Dribsson",
    status: "unactivated",
    avatar: "/professional-woman-headshot.png",
  },
  {
    id: "2",
    type: "person",
    name: "Adam Cadribean",
    status: "active",
    lastSeen: "1w ago",
    avatar: "/professional-man-headshot.png",
  },
  {
    id: "3",
    type: "file",
    name: "final_dribbble_presentation.jpg",
    location: "Presentations",
    lastSeen: "Edited 1w ago",
  },
  {
    id: "4",
    type: "person",
    name: "Margareth Cendribgssen",
    status: "active",
    lastSeen: "1w ago",
    avatar: "/professional-blonde-headshot.png",
  },
  {
    id: "5",
    type: "file",
    name: "dribbble_animation.avi",
    location: "Videos",
    lastSeen: "Added 1y ago",
  },
  {
    id: "6",
    type: "folder",
    name: "Dribbble Folder",
    location: "Projects",
    lastSeen: "Edited 2m ago",
    fileCount: 12,
  },
]

export default function SearchInterface() {
  const [searchTerm, setSearchTerm] = useState("Dribl")
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    files: true,
    people: true,
    chats: false,
    lists: false,
  })

  const filteredResults = mockData.filter((item) => {
    if (activeFilter === "files" && item.type !== "file" && item.type !== "folder") return false
    if (activeFilter === "people" && item.type !== "person") return false
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getResultCounts = () => {
    const all = filteredResults.length
    const files = filteredResults.filter((item) => item.type === "file" || item.type === "folder").length
    const people = filteredResults.filter((item) => item.type === "person").length
    return { all, files, people }
  }

  const counts = getResultCounts()

  const getStatusDot = (status?: string) => {
    if (status === "active") return "bg-yellow-400"
    if (status === "unactivated") return "bg-red-500"
    return ""
  }

  const getFileIcon = (name: string, type: string) => {
    if (type === "folder") return "📁"
    if (name.includes(".jpg") || name.includes(".png")) return "🖼️"
    if (name.includes(".avi") || name.includes(".mp4")) return "▶️"
    return "📄"
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            placeholder="Search..."
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600 ml-2">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs and Settings */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === "all" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All {counts.all}
          </button>
          <button
            onClick={() => setActiveFilter("files")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
              activeFilter === "files" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Paperclip className="w-4 h-4 mr-1" />
            Files {counts.files}
          </button>
          <button
            onClick={() => setActiveFilter("people")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
              activeFilter === "people" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="w-4 h-4 mr-1" />
            People {counts.people}
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {showFilters && (
            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border p-4 w-48 z-10">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Paperclip className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium">Files</span>
                  </div>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, files: !prev.files }))}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      filters.files ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        filters.files ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium">People</span>
                  </div>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, people: !prev.people }))}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      filters.people ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        filters.people ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Chats</span>
                  </div>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, chats: !prev.chats }))}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      filters.chats ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        filters.chats ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <List className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Lists</span>
                  </div>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, lists: !prev.lists }))}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      filters.lists ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        filters.lists ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
          >
            <div className="relative mr-3">
              {result.type === "person" ? (
                <div className="relative">
                  <img
                    src={result.avatar || "/placeholder.svg"}
                    alt={result.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {result.status && (
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusDot(result.status)}`}
                    />
                  )}
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  {getFileIcon(result.name, result.type)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium text-gray-900">{result.name}</div>
              <div className="text-sm text-gray-500">
                {result.type === "person" && result.status === "unactivated" && "Unactivated"}
                {result.type === "person" && result.status === "active" && `Active ${result.lastSeen}`}
                {result.type === "file" && (
                  <>
                    in {result.location} • {result.lastSeen}
                  </>
                )}
                {result.type === "folder" && (
                  <>
                    {result.fileCount} Files in {result.location} • {result.lastSeen}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
