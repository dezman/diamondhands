import Store from '../src/store';

describe('store test', () => {

  it('should not null', () =>{
    expect(Store.get).not.toBeNull();
  })
  
});
