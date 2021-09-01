import CreateProductService from '@modules/services/CreateProductService';
import DeleteProductService from '@modules/services/DeleteProductService';
import ListProductService from '@modules/services/ListProductService';
import ShowProductService from '@modules/services/ShowProductService';
import UpdateProductService from '@modules/services/UpdateProductService';
import { Request, Response } from 'express';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductService();

    const products = await listProductsService.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductService = new ShowProductService();

    const product = showProductService.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductService = new UpdateProductService();

    const updatedProduct = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(updatedProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });

    return response.send();
  }
}

export default ProductsController;
