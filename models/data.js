const articles = [
    {
        id: 1,
        title: "The Art of Mindful Living: A Journey Through Self-Discovery",
        description: "Explore the transformative power of mindfulness and how it can reshape your daily experiences, relationships, and overall well-being.",
        content: "Lorem ipsum dolor sit amet...",
        author: {
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
            role: "Mindfulness Expert"
        },
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "5 min read",
        tags: ["Mindfulness", "Self Development"],
        createdAt: new Date()
    },
    {
        id: 2,
        title: "The Future of Sustainable Technology",
        description: "Discovering how innovative technologies are paving the way for a more sustainable future.",
        content: "Lorem ipsum dolor sit amet...",
        author: {
            name: "Jane Smith",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80",
            role: "Tech Journalist"
        },
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=134&q=80",
        readTime: "3 min read",
        tags: ["Technology", "Sustainability"],
        createdAt: new Date()
    }
];

const writers = [
    {
        id: 1,
        name: "Sarah Wilson",
        role: "Tech Journalist",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
        followers: 1200
    },
    {
        id: 2,
        name: "David Chen",
        role: "Product Designer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
        followers: 890
    }
];

module.exports = { articles, writers };