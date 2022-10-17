using e_shop.Entities;
using e_shop.Repositories.Interfaces;

namespace e_shop.Data.Interfaces
{
  public interface IUnitOfWork : IDisposable
  {
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    Task<int> Complete();
  }
}
