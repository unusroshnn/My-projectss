from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mapping of career goals to required skills
career_skills = {
    "AI/ML Engineer": ["Python", "Machine Learning", "Data Structures", "DBMS"],
    "Full Stack Developer": ["HTML", "CSS", "JavaScript", "React", "DBMS"],
    "Cybersecurity Analyst": ["Python", "Networking", "Linux", "Cybersecurity"],
    "Cloud Engineer": ["Python", "Cloud Computing", "Linux", "Networking"],
    "Data Scientist": ["Python", "Machine Learning", "Data Structures", "Statistics"],
    "Software Developer": ["Python", "Data Structures", "DBMS", "Java"],
    "Blockchain Developer": ["Python", "Blockchain", "Data Structures", "DBMS"],
    "Game Developer": ["Python", "Data Structures", "DBMS", "Java"],
    "Web Developer": ["Python", "Data Structures", "DBMS", "Java"],
    "Mobile Developer": ["Python", "Data Structures", "DBMS", "Java"],
    "DevOps Engineer": ["Python", "Data Structures", "DBMS", "Java"],
    "Database Administrator": ["Python", "Data Structures", "DBMS", "Java"],
    "System Administrator": ["Python", "Data Structures", "DBMS", "Java"],
    
}

# Course recommendations with difficulty levels
skill_courses = {
    "Python": {
        "beginner": "Python for Beginners - Coursera",
        "intermediate": "Python for Everybody - Coursera", 
        "advanced": "Advanced Python Programming - Udemy"
    },
    "Machine Learning": {
        "beginner": "Machine Learning Basics - Coursera",
        "intermediate": "Andrew Ng's ML Course - Coursera",
        "advanced": "Deep Learning Specialization - Coursera"
    },
    "Data Structures": {
        "beginner": "Data Structures Fundamentals - Coursera",
        "intermediate": "Mastering Data Structures - Udemy",
        "advanced": "Advanced Data Structures & Algorithms - Coursera"
    },
    "DBMS": {
        "beginner": "Database Management Basics - Coursera",
        "intermediate": "Database Management Systems - NPTEL",
        "advanced": "Advanced Database Systems - edX"
    },
    "HTML": {
        "beginner": "HTML Crash Course - freeCodeCamp",
        "intermediate": "HTML5 & CSS3 - Udemy",
        "advanced": "Advanced HTML5 & CSS3 - Udemy"
    },
    "CSS": {
        "beginner": "CSS Basics - freeCodeCamp",
        "intermediate": "CSS Flexbox & Grid - Udemy",
        "advanced": "Advanced CSS & Sass - Udemy"
    },
    "JavaScript": {
        "beginner": "JavaScript Essentials - Codecademy",
        "intermediate": "JavaScript: Understanding the Weird Parts - Udemy",
        "advanced": "Advanced JavaScript Concepts - Udemy"
    },
    "React": {
        "beginner": "React Basics - freeCodeCamp",
        "intermediate": "React - The Complete Guide - Udemy",
        "advanced": "Advanced React Patterns - Udemy"
    },
    "Cybersecurity": {
        "beginner": "Introduction to Cybersecurity - Cisco",
        "intermediate": "Cybersecurity Fundamentals - edX",
        "advanced": "Advanced Cybersecurity - Coursera"
    },
    "Linux": {
        "beginner": "Linux Command Line Basics - Coursera",
        "intermediate": "Linux System Administration - Udemy",
        "advanced": "Advanced Linux Administration - Coursera"
    },
    "Networking": {
        "beginner": "Computer Networking Basics - Coursera",
        "intermediate": "Computer Networking - Stanford Online",
        "advanced": "Advanced Computer Networks - edX"
    },
    "Cloud Computing": {
        "beginner": "Cloud Computing Basics - Coursera",
        "intermediate": "Google Cloud Fundamentals - Coursera",
        "advanced": "Advanced Cloud Architecture - AWS"
    },
    "Statistics": {
        "beginner": "Intro to Statistics - Khan Academy",
        "intermediate": "Statistics with Python - Coursera",
        "advanced": "Advanced Statistical Methods - edX"
    }
}

interest_skill_map = {
    "AI/ML": {
        "required_skills": ["Python", "Machine Learning", "Data Structures", "DBMS"],
        "courses": {
            "beginner": [
                "Python for Beginners - Coursera",
                "Machine Learning Basics - Coursera",
                "Data Structures Fundamentals - Coursera",
                "Database Management Basics - Coursera"
            ],
            "intermediate": [
                "Andrew Ng's Machine Learning - Coursera",
                "Deep Learning Specialization - Coursera",
                "Machine Learning A-Z - Udemy",
                "AI For Everyone - Coursera"
            ],
            "advanced": [
                "Python for Data Science and Machine Learning Bootcamp - Udemy",
                "CS50's Introduction to Artificial Intelligence with Python - edX",
                "Applied Data Science with Python Specialization - Coursera",
                "Advanced Machine Learning Specialization - Coursera"
            ]
        }
    },
    "Web Development": {
        "required_skills": ["HTML", "CSS", "JavaScript", "React"],
        "courses": {
            "beginner": [
                "HTML Crash Course - freeCodeCamp",
                "CSS Basics - freeCodeCamp",
                "JavaScript Essentials - Codecademy",
                "React Basics - freeCodeCamp"
            ],
            "intermediate": [
                "The Complete Web Developer in 2023: Zero to Mastery - Udemy",
                "The Web Developer Bootcamp 2023 - Udemy",
                "Full-Stack Web Development with React - Coursera",
                "Responsive Web Design - freeCodeCamp"
            ],
            "advanced": [
                "Modern React with Redux - Udemy",
                "JavaScript: Understanding the Weird Parts - Udemy",
                "Front-End Web Developer Nanodegree - Udacity",
                "Advanced React Patterns - Udemy"
            ]
        }
    },
    "Cybersecurity": {
        "required_skills": ["Python", "Networking", "Cryptography", "Linux"],
        "courses": {
            "beginner": [
                "Introduction to Cyber Security Specialization - Coursera",
                "Computer Networking Basics - Coursera",
                "Linux Command Line Basics - Coursera",
                "Python for Beginners - Coursera"
            ],
            "intermediate": [
                "The Complete Cyber Security Course: Hackers Exposed! - Udemy",
                "Cybersecurity for Business - Coursera",
                "Network Security & Database Vulnerabilities - edX",
                "CompTIA Security+ Certification - Udemy"
            ],
            "advanced": [
                "Advanced Cybersecurity - Coursera",
                "Advanced Computer Networks - edX",
                "Advanced Linux Administration - Coursera",
                "Advanced Python Programming - Udemy"
            ]
        }
    },
    "Data Science": {
        "required_skills": ["Python", "Statistics", "Pandas", "Machine Learning"],
        "courses": {
            "beginner": [
                "Python for Beginners - Coursera",
                "Intro to Statistics - Khan Academy",
                "Data Science Basics - Coursera",
                "Machine Learning Basics - Coursera"
            ],
            "intermediate": [
                "Data Science Specialization - Coursera",
                "Python for Data Science and Machine Learning Bootcamp - Udemy",
                "Statistics with Python Specialization - Coursera",
                "IBM Data Science Professional Certificate - Coursera"
            ],
            "advanced": [
                "Data Science MicroMasters - edX",
                "Applied Data Science with Python - Coursera",
                "Advanced Statistical Methods - edX",
                "Advanced Machine Learning Specialization - Coursera"
            ]
        }
    },
    "Mobile App Development": {
        "required_skills": ["Java", "Kotlin", "Android", "UI/UX"],
        "courses": {
            "beginner": [
                "Java Programming Basics - Coursera",
                "Android App Development for Beginners - Udemy",
                "UI/UX Design Fundamentals - Coursera",
                "Mobile App Development Basics - Udemy"
            ],
            "intermediate": [
                "The Complete Android App Developer Bootcamp - Udemy",
                "Kotlin for Android Developers - Udemy",
                "Developing Android Apps with Kotlin - Udacity",
                "iOS & Swift - The Complete iOS App Development Bootcamp - Udemy"
            ],
            "advanced": [
                "Build Native Mobile Apps with Flutter - Coursera",
                "Advanced Android Development - Udemy",
                "Advanced iOS Development - Udemy",
                "Cross-Platform Mobile Development - Coursera"
            ]
        }
    },
    "Cloud Computing": {
        "required_skills": ["Linux", "AWS", "Docker", "Networking"],
        "courses": {
            "beginner": [
                "Cloud Computing Basics - Coursera",
                "Linux Command Line Basics - Coursera",
                "Computer Networking Basics - Coursera",
                "AWS Fundamentals - AWS"
            ],
            "intermediate": [
                "AWS Certified Solutions Architect - Udemy",
                "Cloud Computing Basics (Cloud 101) - Coursera",
                "Architecting with Google Cloud Platform - Coursera",
                "Docker Mastery: with Kubernetes - Udemy"
            ],
            "advanced": [
                "Advanced Cloud Architecture - AWS",
                "Advanced Linux Administration - Coursera",
                "Advanced Computer Networks - edX",
                "Advanced Docker & Kubernetes - Udemy"
            ]
        }
    }
}

def get_learning_level(cgpa):
    """Determine learning level based on CGPA"""
    if cgpa is None:
        return "intermediate"
    
    cgpa_float = float(cgpa)
    if cgpa_float >= 8.0:
        return "advanced"
    elif cgpa_float >= 6.0:
        return "intermediate"
    else:
        return "beginner"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    user_skills = data.get("skills", [])
    interest = data.get("interest", "")
    name = data.get("name", "Student")
    cgpa = data.get("cgpa", None)

    # Determine learning level based on CGPA
    learning_level = get_learning_level(cgpa)
    
    interest_data = interest_skill_map.get(interest, {})

    if not interest_data:
        return jsonify({
            "name": name,
            "cgpa": cgpa,
            "learning_level": learning_level,
            "missing_skills": [],
            "recommended_courses": [],
            "message": f"No data available for {interest}"
        })

    required_skills = interest_data["required_skills"]
    missing_skills = [skill for skill in required_skills if skill not in user_skills]
    
    # Get courses based on learning level
    courses_by_level = interest_data.get("courses", {})
    recommended_courses = courses_by_level.get(learning_level, [])
    
    # If no courses for the level, fall back to intermediate
    if not recommended_courses and learning_level != "intermediate":
        recommended_courses = courses_by_level.get("intermediate", [])

    return jsonify({
        "name": name,
        "cgpa": cgpa,
        "learning_level": learning_level,
        "missing_skills": missing_skills,
        "recommended_courses": recommended_courses,
        "message": f"Based on your CGPA of {cgpa}, we recommend {learning_level} level courses."
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)
