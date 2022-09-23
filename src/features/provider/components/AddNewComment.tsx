import { VStack, HStack, Avatar } from 'native-base';

import { TextArea } from '../../../components/form/TextArea';
import { Button } from '../../../components/ui/Button';

export function AddNewComment() {
    return (
        <HStack
            my={5}
            px={9}
            space={3}
        >
            <Avatar bg="gray.500" size="lg" source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }} />

            <VStack>
                <TextArea
                    w={64}
                    p={5}
                    fontSize="xs"
                    color="gray.500"
                    bg="gray.100"
                    _focus={{
                        bg: "gray.100"
                    }}
                />

                <Button
                    mt={5}
                    title="Adicionar novo comentário"
                />
            </VStack>
        </HStack>
    );
}