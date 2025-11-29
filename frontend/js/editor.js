// Khởi tạo Froala Editor
const editor = new FroalaEditor('#editor', {
  toolbarButtons: [
    'bold','italic','underline','strikeThrough','fontFamily','fontSize','color',
    'paragraphFormat','align','formatOL','formatUL','insertLink','insertImage','insertTable','undo','redo'
  ]
});

// Lưu blog mới
document.querySelector('#btn-save').addEventListener('click', async () => {
  const title = document.querySelector('#title').value;
  const content = editor.html.get();

  if (!title || !content) {
    alert('Title và nội dung không được để trống');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    const data = await res.json();
    alert('Blog đã lưu! ID: ' + data.id);
    loadBlogs(); // refresh danh sách blog
  } catch (err) {
    console.error(err);
    alert('Lỗi khi lưu blog');
  }
});

// Lấy tất cả blog từ backend và hiển thị
async function loadBlogs() {
  try {
    const res = await fetch('http://localhost:3000/api/blogs');
    const blogs = await res.json();

    const ul = document.querySelector('#blog-list');
    ul.innerHTML = ''; // xóa cũ
    blogs.forEach(blog => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${blog.title}</strong>: ${blog.content}`;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// Load blog khi mở trang
loadBlogs();
