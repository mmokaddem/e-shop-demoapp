using e_shop.Entities;
using e_shop.Specifications.Interfaces;

namespace e_shop.Repositories.Interfaces
{
  public interface IGenericRepository<T> where T : BaseEntity
  {
    Task<T> GetByIdAync(int id);

    Task<IReadOnlyList<T>> ListAllAsyn();
    Task<T> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    Task<int> CountAsync(ISpecification<T> spec);
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<int> SaveChangesAsync();
  }
}
