<template>
    <div class="col-12">
      <div class="card">
        <div class="p-fluid formgrid grid">
           <div class="field col-12">
					<h4 id="title">Roof-Top</h4>
					</div>
         <div class="field col-6">
						<span class="p-input-icon-right">
							<InputText type="search" class="search" placeholder="Search" v-model=" search" />
							<i class="pi pi-search" />
						</span>
					</div>
        </div>
         <div class="field col-12">
           <div class="flex flex-col">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table   class="min-w-full">
                    <thead id="tabth" class="border-b">
                      <tr>
                        <th scope="col" class="font-medium text-gray-900 px-6 py-4 text-left">
                          First
                        </th>
                        <th scope="col" class="font-medium text-gray-900 px-6 py-4 text-left">
                          Last
                        </th>
                        <th scope="col" class=" font-medium text-gray-900 px-6 py-4 text-left">
                          Handle
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b">
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Mark
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Otto
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          @mdo
                        </td>
                      </tr>
                      <tr class="bg-white border-b">
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Jacob
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Thornton
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          @fat
                        </td>
                      </tr>
                      <tr class="bg-white border-b">
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Larry 
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Wild
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          @twitter
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>

         </div>
        </div>
      </div>
</template>
<style scoped>
#tabth{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 15px;
}
#title{
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 25px;
  font-size: 40px;
}
</style>
