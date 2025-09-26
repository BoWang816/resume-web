# Resume Website API 接口文档

## 概述

本文档描述了简历网站的后端API接口规范，用于支持个人作品集网站的数据管理和交互功能。

**基础信息：**
- 基础URL: `http://localhost:3001/api` (开发环境)
- 生产环境URL: 通过环境变量 `VITE_API_URL` 配置
- 请求超时: 10秒
- 内容类型: `application/json`
- 认证方式: Bearer Token (可选)

## 认证机制

### 请求头
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Token获取
Token存储在localStorage中，通过 `localStorage.getItem('token')` 获取。

## 数据模型

### 1. 个人信息 (PersonalInfo)
```typescript
interface PersonalInfo {
  name: string;                    // 姓名
  title: string;                   // 职位标题
  subtitle: string;                // 副标题
  description: string;             // 个人描述
  email: string;                   // 邮箱地址
  location: string;                // 所在位置
  avatar: string;                  // 头像URL
  resume: string;                  // 简历文件路径
}
```

### 2. 关于信息 (AboutInfo)
```typescript
interface AboutInfo {
  introduction: string[];          // 介绍段落数组
  skills: string[];               // 技能列表
  image: string;                  // 个人照片URL
}
```

### 3. 工作经历 (Experience)
```typescript
interface Experience {
  id: number;                     // 唯一标识
  company: string;                // 公司名称
  position: string;               // 职位
  duration: string;               // 工作期间
  location: string;               // 工作地点
  website: string;                // 公司网站
  responsibilities: string[];     // 工作职责列表
}
```

### 4. 项目信息 (Project)
```typescript
interface Project {
  id: number;                     // 唯一标识
  title: string;                  // 项目标题
  description: string;            // 项目描述
  image: string;                  // 项目图片URL
  technologies: string[];         // 使用技术栈
  github: string;                 // GitHub链接
  external: string;               // 外部链接
  featured: boolean;              // 是否为精选项目
}
```

### 5. 社交链接 (SocialLink)
```typescript
interface SocialLink {
  name: string;                   // 平台名称
  url: string;                    // 链接地址
  icon: string;                   // 图标名称
}
```

### 6. 联系信息 (ContactInfo)
```typescript
interface ContactInfo {
  title: string;                  // 标题
  heading: string;                // 主标题
  description: string;            // 描述
  email: string;                  // 联系邮箱
}
```

### 7. 联系表单 (ContactForm)
```typescript
interface ContactForm {
  name: string;                   // 姓名
  email: string;                  // 邮箱
  subject: string;                // 主题
  message: string;                // 消息内容
}
```

## API 接口规范

### 1. 获取个人信息
**接口地址：** `GET /personal-info`

**描述：** 获取个人基本信息

**请求参数：** 无

**响应示例：**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "name": "Bo Wangle",
    "title": "Full Stack Developer",
    "subtitle": "I craft digital experiences that inspire.",
    "description": "I'm a passionate software engineer specializing in building exceptional digital experiences...",
    "email": "bo.wangle@example.com",
    "location": "San Francisco, CA",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "resume": "/resume.pdf"
  }
}
```

**状态码：**
- `200`: 成功获取个人信息
- `500`: 服务器内部错误

---

### 2. 获取关于信息
**接口地址：** `GET /about-info`

**描述：** 获取关于页面的详细信息

**请求参数：** 无

**响应示例：**
```json
{
  "introduction": [
    "Hello! My name is Bo and I enjoy creating things that live on the internet...",
    "Fast-forward to today, and I've had the privilege of working with innovative startups...",
    "Here are the technologies I'm currently passionate about:"
  ],
  "skills": [
    "JavaScript (ES6+)",
    "TypeScript",
    "React & Next.js",
    "Node.js & Express",
    "Python & Django",
    "Docker & Kubernetes",
    "AWS & Vercel",
    "MongoDB & PostgreSQL",
    "GraphQL & REST APIs",
    "Tailwind CSS",
    "Three.js",
    "Framer Motion"
  ],
  "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
}
```

**状态码：**
- `200`: 成功获取关于信息
- `500`: 服务器内部错误

---

### 3. 获取工作经历
**接口地址：** `GET /experiences`

**描述：** 获取所有工作经历列表

**请求参数：** 无

**响应示例：**
```json
[
  {
    "id": 1,
    "company": "TechCorp",
    "position": "Senior Full Stack Developer",
    "duration": "January 2022 - Present",
    "location": "San Francisco, CA",
    "website": "https://techcorp.com",
    "responsibilities": [
      "Lead development of scalable web applications serving 100K+ daily active users...",
      "Architect and implement microservices infrastructure reducing system latency by 40%...",
      "Mentor junior developers and conduct code reviews..."
    ]
  }
]
```

**状态码：**
- `200`: 成功获取工作经历
- `500`: 服务器内部错误

---

### 4. 获取项目列表
**接口地址：** `GET /projects`

**描述：** 获取所有项目列表

**请求参数：** 无

**响应示例：**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "id": 1,
      "title": "AI-Powered Analytics Dashboard",
      "description": "A comprehensive analytics platform that leverages machine learning...",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "technologies": ["React", "TypeScript", "Python", "TensorFlow", "D3.js", "PostgreSQL"],
      "github": "https://github.com/bwangle/ai-analytics",
      "external": "https://analytics-demo.vercel.app",
      "featured": true
    }
  ]
}
```

**状态码：**
- `200`: 成功获取项目列表
- `500`: 服务器内部错误

---

### 5. 获取精选项目
**接口地址：** `GET /projects/featured`

**描述：** 获取精选项目列表

**请求参数：** 无

**响应示例：**
```json
[
  {
    "id": 1,
    "title": "AI-Powered Analytics Dashboard",
    "description": "A comprehensive analytics platform...",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "technologies": ["React", "TypeScript", "Python", "TensorFlow", "D3.js", "PostgreSQL"],
    "github": "https://github.com/bwangle/ai-analytics",
    "external": "https://analytics-demo.vercel.app",
    "featured": true
  }
]
```

**状态码：**
- `200`: 成功获取精选项目
- `500`: 服务器内部错误

---

### 6. 获取社交链接
**接口地址：** `GET /social-links`

**描述：** 获取社交媒体链接列表

**请求参数：** 无

**响应示例：**
```json
[
  {
    "name": "GitHub",
    "url": "https://github.com/bchiang7",
    "icon": "github"
  },
  {
    "name": "LinkedIn",
    "url": "https://linkedin.com/in/bchiang7",
    "icon": "linkedin"
  },
  {
    "name": "Twitter",
    "url": "https://twitter.com/bchiang7",
    "icon": "twitter"
  },
  {
    "name": "Instagram",
    "url": "https://instagram.com/bchiang7",
    "icon": "instagram"
  }
]
```

**状态码：**
- `200`: 成功获取社交链接
- `500`: 服务器内部错误

---

### 7. 获取联系信息
**接口地址：** `GET /contact-info`

**描述：** 获取联系页面信息

**请求参数：** 无

**响应示例：**
```json
{
  "title": "What's Next?",
  "heading": "Get In Touch",
  "description": "Although I'm not currently looking for any new opportunities, my inbox is always open...",
  "email": "bo.wangle@example.com"
}
```

**状态码：**
- `200`: 成功获取联系信息
- `500`: 服务器内部错误

---

### 8. 发送联系表单
**接口地址：** `POST /contact`

**描述：** 处理联系表单提交

**请求头：**
```
Content-Type: application/json
```

**请求体：**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project with you."
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

**错误响应：**
```json
{
  "success": false,
  "message": "Failed to send message. Please try again."
}
```

**状态码：**
- `200`: 消息发送成功
- `400`: 请求参数错误
- `500`: 服务器内部错误

**验证规则：**
- `name`: 必填，字符串，最大长度100
- `email`: 必填，有效的邮箱格式
- `subject`: 必填，字符串，最大长度200
- `message`: 必填，字符串，最大长度1000

## 错误处理

### 标准错误响应格式
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details (optional)"
  }
}
```

### 常见错误码
- `VALIDATION_ERROR`: 请求参数验证失败
- `NOT_FOUND`: 请求的资源不存在
- `UNAUTHORIZED`: 未授权访问
- `FORBIDDEN`: 禁止访问
- `INTERNAL_ERROR`: 服务器内部错误
- `RATE_LIMIT_EXCEEDED`: 请求频率超限

## 国际化支持

### 语言参数
所有GET接口支持通过查询参数指定语言：
```
GET /personal-info?lang=en
GET /personal-info?lang=zh
```

**支持的语言：**
- `en`: 英语 (默认)
- `zh`: 中文

### 多语言响应示例
```json
{
  "name": "Bo Wang",
  "title": "全栈开发工程师",
  "subtitle": "我创造激发灵感的数字体验。",
  "description": "我是一名充满激情的软件工程师..."
}
```

## 性能优化建议

### 缓存策略
- 静态数据（个人信息、关于信息、技能等）建议缓存24小时
- 项目列表和经历列表建议缓存1小时
- 联系信息建议缓存12小时

### 响应时间目标
- 个人信息: < 200ms
- 关于信息: < 300ms
- 工作经历: < 500ms
- 项目列表: < 400ms
- 联系表单提交: < 1000ms

## 安全考虑

### 输入验证
- 所有用户输入必须进行严格验证
- 使用白名单验证邮箱格式
- 限制字符串长度防止DoS攻击
- 对特殊字符进行转义

### 防护措施
- 实施请求频率限制
- 添加CORS配置
- 使用HTTPS传输
- 记录安全相关日志

## 部署配置

### 环境变量
```bash
# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/resume_db
REDIS_URL=redis://localhost:6379

# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 安全配置
JWT_SECRET=your-jwt-secret-key
CORS_ORIGIN=https://yourdomain.com

# 文件存储配置
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-west-2
```

### Docker配置示例
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 测试用例

### 单元测试覆盖
- 所有API端点
- 数据验证逻辑
- 错误处理机制
- 认证和授权

### 集成测试
- 端到端API调用
- 数据库操作
- 邮件发送功能
- 文件上传处理

## 监控和日志

### 关键指标
- API响应时间
- 错误率
- 请求量
- 数据库连接状态

### 日志级别
- `ERROR`: 系统错误和异常
- `WARN`: 警告信息
- `INFO`: 一般信息
- `DEBUG`: 调试信息

## 版本控制

### API版本策略
- 当前版本: v1
- 版本号格式: `/api/v1/`
- 向后兼容性: 至少保持2个版本

### 版本升级流程
1. 开发新版本API
2. 并行运行新旧版本
3. 逐步迁移客户端
4. 废弃旧版本

---

**文档版本:** 1.0  
**最后更新:** 2024年12月  
**维护者:** 开发团队
