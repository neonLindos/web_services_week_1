using Microsoft.AspNetCore.Mvc;
using WebApiLab1.Models;

namespace WebApiLab1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private static readonly List<Student> students = new()
    {
        new Student
        {
            Id = 1,
            Name = "Ayan",
            Age = 20
        },

        new Student
        {
            Id = 2,
            Name = "Dana",
            Age = 21
        }
    };

    // GET /api/students
    [HttpGet]
    public ActionResult<List<Student>> GetStudents()
    {
        return Ok(students);
    }

    // GET /api/students/{id}  -- индивидуальное задание пункта 6
    [HttpGet("{id}")]
    public ActionResult<Student> GetStudentById(int id)
    {
        var student = students.FirstOrDefault(s => s.Id == id);

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student);
    }

    // POST /api/students
    [HttpPost]
    public ActionResult<Student> AddStudent(Student student)
    {
        student.Id = students.Count == 0 ? 1 : students.Max(s => s.Id) + 1;

        students.Add(student);

        return Ok(student);
    }
}
