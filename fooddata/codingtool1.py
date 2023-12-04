import pandas as pd
import os

FoodNames_list = ['apples', 'bananas', 'beer', 'bovine_meat', 'cocoa_beans', 'coconut_oil', 'coffee', 'eggs', 'fish_seafood', 'maize', 'milk', 'oats', 'offals_edible', 'oliver_oil', 'pepper', 'pigmeat', 'plantains', 'potatoes', 'rice', 'sorghum', 'sweet_potatoes', 'tea', 'tomatoes', 'wheat']
list_str_coding1 = []
output_folder = "codes"
for i in FoodNames_list:
    tablex = 'table' + '_' + i
    input_csvfile_preload = i + '.csv'
    str_coding_lines = tablex + "= loadTable('fooddata/dataprocessed3/" + input_csvfile_preload +"', 'csv', 'header');"
    list_str_coding1.append(str_coding_lines)

df_file_names = pd.DataFrame(list_str_coding1, columns=['codes'])
df_file_names.to_csv(os.path.join(output_folder, 'list_str_coding1.csv'), index=False)